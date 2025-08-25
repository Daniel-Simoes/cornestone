import Avatar from "@/components/avatar";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DrawerLayout() {
  const handleLogout = () => {
    Alert.alert("Logout", "Você saiu da conta!");
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#007bff",
          width: 250,
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
      }}
      drawerContent={() => (
        <View style={styles.drawerContainer}>
          <View>
            <View style={styles.avatarContainer}>
              <Avatar />
            </View>

            <TouchableOpacity style={styles.drawerItem}>
              <Ionicons name="settings-outline" size={20} color="#fff" />
              <Text style={[styles.drawerItemText, { marginLeft: 10 }]}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem}>
              <Ionicons name="help-circle-outline" size={20} color="#fff" />
              <Text style={[styles.drawerItemText, { marginLeft: 10 }]}>Support</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.drawerItem}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.cornerstoneIcon}
              />
              <Text style={[styles.drawerItemText, { marginLeft: 10 }]}>Cornerstone AR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={[styles.drawerItem, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={[styles.drawerItemText, { fontWeight: "bold", marginLeft: 10 }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "#007bff",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  drawerItemText: {
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    borderBottomColor: "#fff",
    borderBottomWidth: 0.5,
    marginVertical: 15,
  },
  logoutContainer: {
    marginBottom: 30,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  cornerstoneIcon: {
    width: 15,
    height: 18,
  },
});
