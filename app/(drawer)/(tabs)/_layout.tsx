import Avatar from "@/components/avatar";
import CustomTabBar from "@/components/customTabBar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, TouchableOpacity } from "react-native";

// 🚀 Hooks de animação / drawer
import {
  useDrawerProgress,
  useDrawerStatus,
} from "@react-navigation/drawer";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

export default function TabLayout() {
  const navigation = useNavigation();
  const progress = useDrawerProgress() as any; // usado só para animação
  const drawerStatus = useDrawerStatus(); // "open" | "closed"
  const isDrawerOpen = drawerStatus === "open";

  // Animação da tela principal (mantive sua lógica)
  const animatedStyle = useAnimatedStyle(() => {
    const p = progress?.value ?? 0;
    return {
      transform: [
        { scale: interpolate(p, [0, 0.5], [1, 0.9]) },
        { translateX: interpolate(p, [0, 0], [0, 0]) },
        { translateY: interpolate(p, [0, 0], [0, 0]) },
      ],
      borderRadius: interpolate(p, [0, 1], [0, 25]),
      overflow: "hidden",
    };
  });

  return (
    <>
      {/* StatusBar controlada pelo estado do drawer */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDrawerOpen ? "light-content" : "dark-content"}
      />

      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <Tabs
          tabBar={(props) => <CustomTabBar {...props} />}
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
                  color="#2357C4"
                  style={{ marginRight: 16 }}
                />
              ) : (
                <Avatar />
              ),
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons name="menu" size={24} color="#2357C4" />
                </TouchableOpacity>
              ),
              tabBarIcon: () => null,
            }}
          />

          <Tabs.Screen name="camera" options={{ tabBarIcon: () => null }} />

          <Tabs.Screen
            name="notifications"
            options={{ headerTitle: "Notifications", tabBarIcon: () => null }}
          />
        </Tabs>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
});
