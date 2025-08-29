import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  View
} from "react-native";

import NotificationItem from "@/components/notification"; // ajuste o caminho conforme necessário

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

  // useRef armazenando Map para os anims de opacidade de cada item
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
        rowRefs.current.delete(id); // limpa referência após apagar
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <NotificationItem
            item={item}
            isExpanded={expandedId === item.id}
            onPress={() => handlePress(item.id)}
            onDelete={() => handleDelete(item.id)}
            refMap={rowRefs}
            index={index}
            total={notifications.length}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    paddingTop: 10,
  },
  listContainer: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
});
