import CustomHeader from "@/components/customNavigation/header";
import CustomTabBar from "@/components/customNavigation/tabBar";
import { DrawerNavigationProp, useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";

type DrawerNav = DrawerNavigationProp<any>;

export default function TabLayout() {
  const navigation = useNavigation<DrawerNav>();
  const progress = useDrawerProgress() as any;
  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === "open";

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress?.value ?? 0;
    return {
      transform: [
        { scale: interpolate(p, [0, 0.5], [1, 0.9]) },
        { translateX: 0 },
        { translateY: 0 },
      ],
      borderRadius: interpolate(p, [0, 1], [0, 25]),
      overflow: "hidden",
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const p = progress?.value ?? 0;
    const fastProgress = Math.min(p / 0.7, 1);
    return {
      backgroundColor: interpolateColor(fastProgress, [0, 1], ["#fff", "#2357C4"]),
    };
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDrawerOpen ? "light-content" : "dark-content"}
      />

      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]} />

      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <Tabs
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={({ route }) => ({
            headerTitle: "",
            tabBarShowLabel: false,
            tabBarStyle: { position: "absolute", height: 60 },
            headerRight: () => <CustomHeader routeName={route.name} navigation={navigation} />,
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerTitle: () => (
                <CustomHeader
                  routeName="index"
                  navigation={navigation}
                />
              ),
              tabBarIcon: () => null,
              headerLeft: undefined, 
              headerRight: undefined, 
            }}
          />
          <Tabs.Screen name="notifications" options={{ headerTitle: "Notifications", tabBarIcon: () => null }} />
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
