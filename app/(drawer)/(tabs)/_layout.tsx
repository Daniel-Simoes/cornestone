import Avatar from "@/components/avatar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity as RNTouchableOpacity,
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

  const tabs: TabItem[] = [
    { name: "index", icon: "home-outline" },
    { name: "camera", icon: "qr-code" },
    { name: "notifications", icon: "notifications-outline" },
  ];

  return (
    <>
      <Tabs
        screenOptions={{
          headerTitle: "",
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            height: 60,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          headerRight: () => <Avatar onPress={() => setModalVisible(true)} />,
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerTitle: tab.name === "notifications" ? "Notifications" : "",
              headerTitleStyle: {}, // usa cor padrão do header
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
                      style={{
                        top: -25,
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

      {/* Modal */}
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
