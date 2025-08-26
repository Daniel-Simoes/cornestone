// CarouselSupport.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title: string;
  items: string[];
};

export default function CarouselSupport({ title, items }: Props) {
  const router = useRouter();

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const isLast = index === items.length - 1;

    return (
      <TouchableOpacity
        style={[styles.item, isLast && styles.lastItem]}
        onPress={() => router.push({ pathname: "/pdfScreen", params: { title: "Meu PDF" } })}
        activeOpacity={0.6}
      >
        <Text style={styles.itemLabel}>{item}</Text>
        <Ionicons name="chevron-forward" size={20} color="#555" />
      </TouchableOpacity>
    );
  };

  if (!items || items.length === 0) return null; // Oculta se não houver subcategorias

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.card}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={renderItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
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
