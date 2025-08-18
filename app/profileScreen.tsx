import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type RowItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value?: string;
  valueColor?: string;
};

type SectionT = {
  title?: string | null;
  data: RowItem[];
};

const SECTIONS: SectionT[] = [
  {
    title: null,
    data: [
      {
        id: "1",
        label: "Activity Status",
        icon: "walk-outline",
        value: "Active",
        valueColor: "#2ecc71",
      },
    ],
  },
  {
    title: "PERSONALIZE",
    data: [
      { id: "2", label: "Personal Details", icon: "person-outline" },
      { id: "3", label: "Heart Rate Zones", icon: "fitness-outline" },
      { id: "4", label: "Settings", icon: "settings-outline" },
    ],
  },
  {
    title: "NEED HELP?",
    data: [
      { id: "5", label: "Tips and Tricks", icon: "sparkles-outline" as any },
      { id: "6", label: "Frequently Asked Questions", icon: "help-circle-outline" },
      { id: "7", label: "Contact Us", icon: "mail-outline" },
    ],
  },
];

export default function ProfileScreen() {
  const renderItem = ({
    item,
    index,
    section,
  }: {
    item: RowItem;
    index: number;
    section: SectionT;
  }) => {
    const isFirst = index === 0;
    const isLast = index === section.data.length - 1;

    return (
      <View
        style={[
          styles.cardRowWrapper,
          isFirst && styles.cardTopRounded,
          isLast && styles.cardBottomRounded,
        ]}
      >
        <TouchableOpacity style={styles.row} activeOpacity={0.7}>
          <View style={styles.rowLeft}>
            <Ionicons name={item.icon} size={20} color="#111" style={styles.icon} />
            <Text style={styles.rowText}>{item.label}</Text>
          </View>

          <View style={styles.rowRight}>
            {item.value ? (
              <>
                {item.valueColor && (
                  <View style={[styles.dot, { backgroundColor: item.valueColor }]} />
                )}
                <Text style={styles.valueText}>{item.value}</Text>
              </>
            ) : null}
            <Ionicons name="chevron-forward" size={20} color="#9A9AA2" />
          </View>
        </TouchableOpacity>

        {/* separador interno do “card” (não mostra no último item) */}
        {!isLast && <View style={styles.innerSeparator} />}
      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: SectionT }) =>
    section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : <View />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Close no topo direito */}
      <TouchableOpacity style={styles.closeBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>

      {/* avatar + nome */}
      <View style={styles.headerCenter}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Omar</Text>
      </View>

      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

const CARD_BG = "#F4F4F7";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Header
  closeBtn: {
    position: "absolute",
    right: 20,
    top: 12,
    zIndex: 10,
  },
  closeText: {
    fontSize: 16,
    color: "#111",
  },
  headerCenter: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  profileName: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
  },

  // Section title
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9A9AA2",
    marginTop: 18,
    marginBottom: 8,
    marginHorizontal: 18,
    letterSpacing: 0.3,
  },

  // Card wrapper (simula um card único por seção)
  cardRowWrapper: {
    backgroundColor: CARD_BG,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  cardTopRounded: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardBottomRounded: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginBottom: 2,
  },
  innerSeparator: {
    height: 1,
    backgroundColor: "#E6E6EA",
    marginLeft: 48, // recuo para alinhar com o texto (após o ícone)
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  rowText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  valueText: {
    marginRight: 6,
    fontSize: 15,
    color: "#333",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
});
