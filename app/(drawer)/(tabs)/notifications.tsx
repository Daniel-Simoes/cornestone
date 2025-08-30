import NotificationItem from "@/components/notification";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Novo Arquivo Adicionado",
      description: "Você recebeu uma nova mensagem no chat. Você recebeu uma nova mensagem no chat. Você recebeu uma nova mensagem no chat.",
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

  // Fecha qualquer notificação expandida
  const handleCloseExpanded = () => {
    setExpandedId(null);
  };

  // Resetar estado quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      handleCloseExpanded();
    }, [])
  );

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
        rowRefs.current.delete(id);
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseExpanded}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <NotificationItem
              item={item}
              isExpanded={expandedId === item.id}
              onPress={(e) => {
                e.stopPropagation?.(); // previne o TouchableWithoutFeedback de fechar imediatamente
                handlePress(item.id);
              }}
              onDelete={() => handleDelete(item.id)}
              refMap={rowRefs}
              index={index}
              total={notifications.length}
            />
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
