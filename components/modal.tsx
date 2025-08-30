import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SectionItem = { label: string; value?: string };
type SectionData = { title: string; data: SectionItem[] };

type ProfileModalProps = {
  visible: boolean;
  onClose: () => void;
  avatarSize?: number;
};

export default function ProfileModal({ visible, onClose, avatarSize = 100 }: ProfileModalProps) {
  const modalAvatarSize = avatarSize;

  const sections: SectionData[] = [
    { title: "", data: [{ label: "Activity Status", value: "Active" }] },
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
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Avatar grande e nome */}
          <View style={styles.profileInfo}>
            <Image
              source={require("../assets/avatar.png")}
              style={{
                width: modalAvatarSize,
                height: modalAvatarSize,
                borderRadius: modalAvatarSize / 2,
                marginBottom: 10,
              }}
            />
            <Text style={styles.profileName}>Daniel S.</Text>
          </View>

          {/* SectionList */}
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.label + index}
            renderItem={({ item, index, section }) => {
              const isLast = index === section.data.length - 1;
              return (
                <View style={styles.card}>
                  <TouchableOpacity
                    style={[styles.listItem, isLast && styles.listItemLast]}
                  >
                    <Text style={styles.listItemLabel}>{item.label}</Text>
                    {item.value && <Text style={styles.listItemValue}>{item.value}</Text>}
                    <Ionicons name="chevron-forward" size={18} color="#ccc" />
                  </TouchableOpacity>
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) =>
              title ? <Text style={styles.sectionHeader}>{title}</Text> : null
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "95%",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  modalHeader: {
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
  profileName: {
    fontSize: 22,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listItemLabel: {
    fontSize: 16,
    color: "#111",
  },
  listItemValue: {
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
