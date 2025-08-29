import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { name: "index", icon: "home-outline" },
  { name: "camera", icon: "qr-code" },
  { name: "notifications", icon: "notifications-outline" },
];

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* TabBar */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const icon = TABS.find((tab) => tab.name === route.name)?.icon || "ellipse";

          const onPress = () => {
            if (route.name === "camera") {
              setCameraModalVisible(true);
            } else {
              navigation.navigate(route.name);
            }
          };

          // Esconde o botão de câmera aqui (será desenhado separadamente)
          if (route.name === "camera") return <View key={route.key} style={{ flex: 1 }} />;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name={icon}
                size={24}
                color={isFocused ? "#2357C4" : "#999"}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botão flutuante da câmera */}
      <TouchableOpacity
        onPress={() => setCameraModalVisible(true)}
        style={styles.floatingCameraButton}
        activeOpacity={0.9}
      >
        <Ionicons name="qr-code" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal da Câmera */}
      <Modal
        animationType="slide"
        transparent
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
              source={require("../assets/fuseboard.png")}
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
  tabBar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    top: 8
  },
  floatingCameraButton: {
    position: "absolute",
    bottom: 30, // Ajuste conforme necessário para o visual
    alignSelf: "center",
    backgroundColor: "#2357C4",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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
