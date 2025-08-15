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
      title: "Nova Mensagem",
      description:
        "Você recebeu uma nova mensagem no chat. Você recebeu uma nova mensagem no chat. Você recebeu uma nova mensagem no chat. Você recebeu uma nova mensagem no chat.",
      icon: "chatbubble-outline",
    },
    {
      id: "2",
      title: "Atualização do App",
      description: "Uma nova versão do app está disponível.",
      icon: "cloud-download-outline",
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

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <RectButton style={styles.rightAction}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={28} color="#fff" />
        </Animated.View>
      </RectButton>
    );
  };

  const renderItem = ({ item }: { item: typeof notifications[0] }) => {
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
        <Animated.View
          style={[
            styles.notificationItem,
            { opacity, paddingBottom: isExpanded ? 16 : 0 },
          ]}
        >
          {/* Ícone + linha vertical */}
          <View style={styles.iconContainer}>
            <Ionicons
              name={item.icon as any}
              size={28}
              color="#007bff"
            />
            <View style={styles.verticalLine} />
          </View>

          {/* Texto e botões */}
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => handlePress(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text
              style={styles.notificationDescription}
              numberOfLines={isExpanded ? undefined : 1}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>

            {isExpanded && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "red" }]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#007bff" }]}
                  onPress={() => setExpandedId(null)}
                >
                  <Text style={styles.buttonText}>Manter</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
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
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 6,
    marginBottom: 6,
    alignItems: "center", // centraliza ícone verticalmente
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 8,
    position: "relative",
  },
  verticalLine: {
    position: "absolute",
    left: 14, // ajusta para ficar próximo do ícone
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#ccc",
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginBottom: 6,
    borderRadius: 10,
  },
});
