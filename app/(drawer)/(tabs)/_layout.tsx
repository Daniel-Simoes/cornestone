import Avatar from "@/components/avatar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type IoniconName = keyof typeof Ionicons.glyphMap;

type TabItem = {
  name: string;
  icon: IoniconName;
};

export default function TabLayout() {
  const router = useRouter();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const tabs: TabItem[] = [
    { name: "index", icon: "home-outline" },
    { name: "camera", icon: "qr-code" },
    { name: "notifications", icon: "notifications-outline" },
  ];

  const isOverlayActive = modalVisible || cameraModalVisible || profileModalVisible;

  const sections = [
    {
      title: "",
      data: [{ label: "Activity Status", value: "Active" }],
    },
    {
      title: "PERSONALIZE",
      data: [
        { label: "Personal Details" },
        { label: "Heart Rate Zones" },
        { label: "Settings" },
      ],
    },
    {
      title: "NEED HELP?",
      data: [
        { label: "Tips and Tricks" },
        { label: "Frequently Asked Questions" },
        { label: "Contact Us" },
      ],
    },
  ];

  return (
    <>
      <StatusBar
        barStyle={isOverlayActive ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <Tabs
        screenOptions={({ route }) => ({
          headerTitle: "",
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            height: 60,
          },
          headerRight: () =>
            route.name === "notifications" ? (
              <Ionicons
                name="information-circle-outline"
                size={26}
                color="#007bff"
                style={{ marginRight: 16 }}
              />
            ) : (
              <Avatar onPress={() => setProfileModalVisible(true)} />
            ),
        })}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerTitle: tab.name === "notifications" ? "Notifications" : "",
              headerLeft:
                tab.name !== "notifications"
                  ? () => (
                      <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{ marginLeft: 16 }}
                      >
                        <Ionicons name="menu" size={24} color="#007bff" />
                      </TouchableOpacity>
                    )
                  : undefined,
              tabBarIcon: ({ focused }) => {
                if (tab.name === "camera") {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setCameraModalVisible(true)}
                      style={styles.cameraButton}
                    >
                      <Ionicons name={tab.icon} size={28} color="#fff" />
                    </TouchableOpacity>
                  );
                }
                return (
                  <Ionicons
                    name={tab.icon}
                    size={24}
                    color={focused ? "#007bff" : "#999"}
                  />
                );
              },
            }}
          />
        ))}
      </Tabs>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.profileOverlay}>
          <View style={styles.profileContainer}>
            {/* Header */}
            <View style={styles.profileHeader}>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>

            {/* Foto e Nome */}
            <View style={styles.profileInfo}>
              <Image
                source={require("../../../assets/avatar.png")}
                style={styles.avatar}
              />
              <Text style={styles.name}>Daniel S.</Text>
            </View>

            {/* Lista */}
            <SectionList
              sections={sections}
              keyExtractor={(item, index) => item.label + index}
              renderItem={({ item, index, section }) => {
                const isLast = index === section.data.length - 1;
                return (
                  <TouchableOpacity
                    style={[profileStyles.item, isLast && profileStyles.lastItem]}
                  >
                    <Text style={profileStyles.itemLabel}>{item.label}</Text>
                    {item.value && <Text style={profileStyles.itemValue}>{item.value}</Text>}
                    <Ionicons name="chevron-forward" size={18} color="#ccc" />
                  </TouchableOpacity>
                );
              }}
              renderSectionHeader={({ section: { title } }) =>
                title ? <Text style={profileStyles.sectionHeader}>{title}</Text> : null
              }
              ItemSeparatorComponent={() => <View style={profileStyles.separator} />}
              contentContainerStyle={{ paddingBottom: 40 }}
            />
          </View>
        </View>
      </Modal>

      
        

      {/* Modal da Câmera */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cameraModalVisible}
        onRequestClose={() => setCameraModalVisible(false)}
      >
        <View style={styles.modalOverlayCamera}>
          <TouchableOpacity
            style={styles.closeIconOverlay}
            onPress={() => setCameraModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.modalContent}>
            <Image
              source={require("../../../assets/fuseboard.png")}
              style={{
                width: Dimensions.get("window").width * 0.5,
                height: Dimensions.get("window").width * 0.5,
                resizeMode: "contain",
                marginBottom: 20,
              }}
            />
            <Text style={{ textAlign: "center" }}>
              Vá até o Quadro geral e escaneie o QR code
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCameraModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  profileOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  profileContainer: {
    height: "95%",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
  },
  profileInfo: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  cameraButton: {
    top: -20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlayCamera: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIconOverlay: {
    position: "absolute",
    top: "40%",
    right: 20,
    zIndex: 1,
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

// Estilos do SectionList para parecer com SettingsList
const profileStyles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    // borderWidth:1,
    // borderColor:"ccc",
    // borderRadius:8,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLabel: {
    fontSize: 16,
    color: "#111",
  },
  itemValue: {
    fontSize: 14,
    color: "green",
    marginRight: 8,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
});
