import Avatar from "@/components/avatar";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onLogout?: () => void;
};

export default function CustomDrawerContent({ onLogout }: Props) {
  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <View style={styles.drawerContainer}>
      <View>
        {/* Profile em row */}
        <View style={styles.profileContainer}>
          <Avatar size={80}/>
          <View style={styles.profileTextContainer}>
            <Text style={styles.userName}>Mark Philips</Text>
            <Text style={styles.userEmail}>mark_philips@gmail.com</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Suporte</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.cornerstoneIcon}
          />
          <Text style={styles.cornerstoneText}>cornerstone</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.version}>~ v 1.0.1</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  profileTextContainer: {
    marginLeft: 12, // espaçamento entre avatar e textos
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
