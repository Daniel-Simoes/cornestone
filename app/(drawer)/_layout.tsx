import CustomDrawerContent from "@/components/customNavigation/drawer";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#2357C4",
          width: 275,
        },
        overlayColor: "transparent",
      }}
      drawerContent={() => <CustomDrawerContent />}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}
