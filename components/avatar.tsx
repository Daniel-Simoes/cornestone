import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Avatar = ({ onPress }: { onPress?: () => void }) => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const sections = [
    {
      title: "",
      data: [{ label: "Activity Status", value: "Active" }],
    },
    {
      title: "PERSONALIZE",
      data: [
        { label: "Personal Details" },
        { label: "Heart Rate Zones" },
        { label: "Settings" },
      ],
    },
    {
      title: "NEED HELP?",
      data: [
        { label: "Tips and Tricks" },
        { label: "Frequently Asked Questions" },
        { label: "Contact Us" },
      ],
    },
  ];

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity onPress={onPress ?? (() => setProfileModalVisible(true))}>
        <Image
          source={require("../assets/avatar.png")}
          style={styles.avatarRight}
        />
      </TouchableOpacity>

      {/* Modal de Perfil */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.profileOverlay}>
          <View style={styles.profileContainer}>
            {/* Header */}
            <View style={styles.profileHeader}>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>

            {/* Info */}
            <View style={styles.profileInfo}>
              <Image
                source={require("../assets/avatar.png")}
                style={styles.avatarBig}
              />
              <Text style={styles.name}>Daniel S.</Text>
            </View>

            {/* Lista */}
            <SectionList
              sections={sections}
              keyExtractor={(item, index) => item.label + index}
              renderItem={({ item, index, section }) => {
                const isLast = index === section.data.length - 1;
                return (
                   <View style={styles.card}>
                  <TouchableOpacity
                    style={[modalStyles.item, isLast && modalStyles.lastItem]}
                  >
                    <Text style={modalStyles.itemLabel}>{item.label}</Text>
                    {item.value && <Text style={modalStyles.itemValue}>{item.value}</Text>}
                    <Ionicons name="chevron-forward" size={18} color="#ccc" />
                  </TouchableOpacity>
                  </View>

                );
              }}
              renderSectionHeader={({ section: { title } }) =>
                title ? <Text style={modalStyles.sectionHeader}>{title}</Text> : null
              }
              ItemSeparatorComponent={() => <View style={modalStyles.separator} />}
              contentContainerStyle={{ paddingBottom: 40 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  avatarRight: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "white",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  profileOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  profileContainer: {
    height: "95%",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
  },
  profileInfo: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarBig: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
});

const modalStyles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLabel: {
    fontSize: 16,
    color: "#111",
  },
  itemValue: {
    fontSize: 14,
    color: "green",
    marginRight: 8,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
});

export default Avatar;
