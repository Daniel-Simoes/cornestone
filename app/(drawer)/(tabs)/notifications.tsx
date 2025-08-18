import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Novo Arquivo Adicionado",
      description:
        "Você recebeu uma nova mensagem no chat. Você recebeu uma nova mensagem no chat. Você recebeu uma nova mensagem no chat.",
      icon: "cloud-upload-outline",
    },
    {
      id: "2",
      title: "Atualização do App",
      description: "Uma nova versão do app está disponível.",
      icon: "chatbox-outline",
    },
    {
      id: "3",
      title: "Lembrete",
      description: "Não se esqueça da reunião de amanhã às 10h.",
      icon: "notifications-outline",
    },
  ]);

  const rowRefs = useRef(new Map());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handlePress = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id: string) => {
    const row = rowRefs.current.get(id);
    if (row) {
      Animated.timing(row.opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
        if (expandedId === id) setExpandedId(null);
      });
    }
  };

  const renderRightActions = () => (
    <RectButton style={styles.rightAction}>
      <Ionicons name="trash-outline" size={28} color="#fff" />
    </RectButton>
  );

  const renderItem = ({ item, index }: { item: typeof notifications[0]; index: number }) => {
    const isExpanded = expandedId === item.id;
    const opacity = new Animated.Value(1);

    rowRefs.current.set(item.id, { opacity });

    return (
      <Swipeable
        friction={3}
        rightThreshold={80}
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => handleDelete(item.id)}
      >
        <Animated.View style={[styles.card, { opacity }]}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handlePress(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon as any} size={20} color="#007bff" />
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text
                style={styles.description}
                numberOfLines={isExpanded ? undefined : 1}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>

              {isExpanded && (
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "red" }]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.buttonText}>Apagar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "#007bff" }]}
                    onPress={() => setExpandedId(null)}
                  >
                    <Text style={styles.buttonText}>Manter</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Linha separadora entre itens */}
          {index !== notifications.length - 1 && <View style={styles.separator} />}
        </Animated.View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    top:10
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    margin: 16,
  },
  listContainer: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    top:-2,
    marginRight: 12,
    marginTop: 2,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 52, // deixa alinhado depois do ícone
  },
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 4,
    borderRadius: 10,
  },
});
