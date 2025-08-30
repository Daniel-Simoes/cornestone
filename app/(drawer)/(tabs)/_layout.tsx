import Avatar from "@/components/avatar";
import CustomTabBar from "@/components/customTabBar";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerNavigationProp,
  useDrawerProgress,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

type DrawerNav = DrawerNavigationProp<any>;

export default function TabLayout() {
  const navigation = useNavigation<DrawerNav>();
  const progress = useDrawerProgress() as any;
  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === "open";

  // animação da tela principal
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

  // animação do background por trás da tela animada (mais rápida)
  const backgroundStyle = useAnimatedStyle(() => {
    const p = progress?.value ?? 0;
    const fastProgress = Math.min(p / 0.7, 1); // acelera a transição

    return {
      backgroundColor: interpolateColor(
        fastProgress,
        [0, 1],
        ["#fff", "#2357C4"]
      ),
    };
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDrawerOpen ? "light-content" : "dark-content"}
      />

      {/* Fundo animado */}
      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]} />

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
