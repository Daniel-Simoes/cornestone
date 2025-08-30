import Avatar from "@/components/avatar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onLogout?: () => void;
};

export default function CustomDrawerContent({ onLogout }: Props) {
  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Topo fixo: perfil */}
      <View style={styles.profileContainer}>
        <Avatar size={80} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
            Daniel Simoes
          </Text>
          <Text style={styles.userEmail} numberOfLines={1} ellipsizeMode="tail">
            daniel.simoes@hotmail.com
          </Text>
        </View>
      </View>

      {/* Área scrollável dos itens do menu */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.drawerItem}>
          <Ionicons name="settings-outline" size={20} color="#fff" />
          <Text style={styles.drawerItemText} numberOfLines={1} ellipsizeMode="tail">
            Configurações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem}>
          <Ionicons name="help-circle-outline" size={20} color="#fff" />
          <Text style={styles.drawerItemText} numberOfLines={1} ellipsizeMode="tail">
            Suporte
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.drawerItem}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.cornerstoneIcon}
          />
          <Text style={styles.drawerItemText} numberOfLines={1} ellipsizeMode="tail">
            Cornerstone
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer fixo */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.drawerItemText} numberOfLines={1} ellipsizeMode="tail">
            Logout
          </Text>
        </TouchableOpacity>

        <Text style={styles.version} numberOfLines={1} ellipsizeMode="tail">
          Cornerstone App ~v 1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#2357C4",
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  profileTextContainer: {
    marginLeft: 12,
    flexShrink: 1,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  userEmail: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 2,
    flexShrink: 1,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    gap: 10,
  },
  drawerItemText: {
    color: "#fff",
    fontSize: 16,
    flexShrink: 1,
  },
  divider: {
    borderBottomColor: "#fff",
    borderBottomWidth: 0.5,
    marginVertical: 20,
  },
  cornerstoneIcon: {
    width: 20,
    height: 22,
    resizeMode: "contain",
  },
  footer: {
    marginBottom: 60,
  },
  version: {
    color: "#ddd",
    fontSize: 12,
  },
});
