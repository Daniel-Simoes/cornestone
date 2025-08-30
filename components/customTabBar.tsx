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
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 🔹 Garante que os ícones são válidos do Ionicons
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const TABS: { name: string; icon: IoniconName }[] = [
  { name: "index", icon: "home-outline" },
  { name: "camera", icon: "qr-code" },
  { name: "notifications", icon: "notifications-outline" },
];

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleScan = () => {
    console.log("Scanear pressed");
    // Aqui você pode chamar sua função de escaneamento
  };

  return (
    <>
      {/* TabBar */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const icon =
            TABS.find((tab) => tab.name === route.name)?.icon || "ellipse";

          const onPress = () => {
            if (route.name === "camera") {
              setCameraModalVisible(true);
            } else {
              navigation.navigate(route.name);
            }
          };

          if (route.name === "camera")
            return <View key={route.key} style={{ flex: 1 }} />;

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

            {/* Linha de botões: Fechar e Scanear */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.closeBtn]}
                onPress={() => setCameraModalVisible(false)}
              >
                <Text style={styles.actionButtonText}>Fechar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.scanBtn]}
                onPress={handleScan}
              >
                <Text style={styles.actionButtonText}>Scanear</Text>
              </TouchableOpacity>
            </View>
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
    top: 8,
  },
  floatingCameraButton: {
    position: "absolute",
    bottom: 30,
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
    backgroundColor: "rgba(0,0,0,0.93)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 280,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  closeBtn: {
    backgroundColor: "#007bff",
  },
  scanBtn: {
    backgroundColor: "#28a745",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
