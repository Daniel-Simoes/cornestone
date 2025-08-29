// app/profileScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={require("../../assets/avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>Daniel S.</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.label + index}
        renderItem={({ item, index, section }) => {
          const isLast = index === section.data.length - 1;
          return (
            <TouchableOpacity
              style={[styles.item, isLast && styles.lastItem]}
            >
              <Text style={styles.itemLabel}>{item.label}</Text>
              {item.value && <Text style={styles.itemValue}>{item.value}</Text>}
              <Ionicons name="chevron-forward" size={18} color="#ccc" />
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { title } }) =>
          title ? <Text style={styles.sectionHeader}>{title}</Text> : null
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  profileInfo: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
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
