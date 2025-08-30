import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraPreview from "../modals/cameraPreview";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const [cameraVisible, setCameraVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleScan = () => console.log("Scan pressed");

  return (
    <>
      <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity onPress={() => navigation.navigate("index")} style={styles.tabButton}>
          <Ionicons name="home-outline" size={24} color={state.index === 0 ? "#2357C4" : "#999"} />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity onPress={() => navigation.navigate("notifications")} style={styles.tabButton}>
          <Ionicons name="notifications-outline" size={24} color={state.index === 2 ? "#2357C4" : "#999"} />
        </TouchableOpacity>
      </View>

      {/* Botão flutuante */}
      <TouchableOpacity
        onPress={() => setCameraVisible(true)}
        style={styles.floatingCameraButton}
        activeOpacity={0.9}
      >
        <Ionicons name="qr-code" size={28} color="#fff" />
      </TouchableOpacity>
      <CameraPreview 
        visible={cameraVisible} 
        onClose={() => setCameraVisible(false)} onScan={handleScan} 
      />
    </>
  );
}

// estilos iguais aos seus
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 30,
    zIndex: 1,
  },
  tabButton: {
    width: 90,
    top: 8,
    alignItems: "center",
  },
  floatingCameraButton: {
    position: "absolute",
    bottom: 25,
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
    zIndex: 3,
  },
});
