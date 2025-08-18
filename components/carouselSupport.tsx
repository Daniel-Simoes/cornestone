import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SettingItem = {
  id: string;
  label: string;
  onPress: () => void;
};

type Props = {
  title: string;
  items: SettingItem[];
};

function SettingsList({ title, items }: Props) {
  const renderItem = ({ item, index }: { item: SettingItem; index: number }) => {
    const isLast = index === items.length - 1;

    return (
      <TouchableOpacity
        style={[styles.item, isLast && styles.lastItem]}
        onPress={item.onPress}
        activeOpacity={0.6}
      >
        <Text style={styles.itemLabel}>{item.label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#555" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.card}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <SettingsList
        title="Account Settings"
        items={[
          {
            id: "1",
            label: "Manage Your Amazon",
            onPress: () => Alert.alert("Family"),
          },
          {
            id: "2",
            label: "Manage apps & services",
            onPress: () => Alert.alert("Apps"),
          },
          {
            id: "3",
            label: "Manage Prime membership",
            onPress: () => Alert.alert("Prime"),
          },
          {
            id: "4",
            label: "Your purchase preferences",
            onPress: () => Alert.alert("Preferences"),
          }
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
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
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 16,
  },
});
