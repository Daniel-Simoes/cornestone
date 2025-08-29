import Avatar from "@/components/avatar";
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
          backgroundColor: "#1565C0", // azul mais próximo do print
          width: 275,
        },
        overlayColor: "transparent",
        // drawerActiveTintColor: "#fff",
        // drawerInactiveTintColor: "#fff",
      }}
      drawerContent={() => (
        <View style={styles.drawerContainer}>
          {/* TOPO */}
          <View>
            <View style={styles.profileContainer}>
              <Avatar size={70} />
              <Text style={styles.userName}>Mark Philips</Text>
              <Text style={styles.userEmail}>mark_philips@gmail.com</Text>
            </View>

            {/* Itens de navegação */}
            <TouchableOpacity style={styles.drawerItem}>
              <Text style={styles.drawerItemText}>Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem}>
              <Text style={styles.drawerItemText}>Suporte</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.cornerstoneIcon}
              />
              <Text style={styles.cornerstoneText}>cornerstone</Text>
            </View>
          </View>

          {/* Rodapé */}
          <View style={styles.footer}>
            <Text style={styles.version}>~ v 1.0.1</Text>
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
    backgroundColor: "#2357C4",
  },
  profileContainer: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 2,
  },
  drawerItem: {
    marginVertical: 12,
  },
  drawerItemText: {
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    borderBottomColor: "#fff",
    borderBottomWidth: 0.5,
    marginVertical: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cornerstoneIcon: {
    width: 20,
    height: 22,
    resizeMode: "contain",
  },
  cornerstoneText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  footer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  version: {
    color: "#ddd",
    fontSize: 12,
  },
});
