import Avatar from "@/components/avatar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  TouchableOpacity as RNTouchableOpacity,
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
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  const tabs: TabItem[] = [
    { name: "index", icon: "home-outline" },
    { name: "camera", icon: "qr-code" },
    { name: "notifications", icon: "notifications-outline" },
  ];

  // StatusBar light quando qualquer overlay estiver aberto
  const isOverlayActive = modalVisible || cameraModalVisible;

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
              <Avatar onPress={() => setModalVisible(true)} />
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
                      <RNTouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{ marginLeft: 16 }}
                      >
                        <Ionicons name="menu" size={24} color="#007bff" />
                      </RNTouchableOpacity>
                    )
                  : undefined,
              tabBarIcon: ({ focused }) => {
                if (tab.name === "camera") {
                  return (
                    <RNTouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setCameraModalVisible(true)}
                      style={{
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
                      }}
                    >
                      <Ionicons name={tab.icon} size={28} color="#fff" />
                    </RNTouchableOpacity>
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

      {/* Modal do Avatar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Olá! Este é o modal do Avatar.</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Scanei</Text>
            </TouchableOpacity>
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
          {/* Botão X acima do modalContent */}
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
    top: "40%", // ajusta conforme necessidade
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
