import Avatar from "@/components/avatar";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  routeName: string;
  navigation: DrawerNavigationProp<any>;
};

export default function CustomHeader({ routeName, navigation }: Props) {
  if (routeName === "notifications") {
    return (
      <Ionicons
        name="information-circle-outline"
        size={26}
        color="#2357C4"
        style={{ marginRight: 16 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#2357C4" />
      </TouchableOpacity>
      <Avatar size={36} clickable/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // importante
  },
});
