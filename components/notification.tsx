import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

type Notification = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type Props = {
  item: Notification;
  isExpanded: boolean;
  onPress: () => void;
  onDelete: () => void;
  refMap: React.MutableRefObject<Map<string, { opacity: Animated.Value }>>;
  index: number;
  total: number;
};

export default function NotificationItem({
  item,
  isExpanded,
  onPress,
  onDelete,
  refMap,
  index,
  total,
}: Props) {
  const opacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Salva o Animated.Value na refMap
    if (refMap && refMap.current) {
      refMap.current.set(item.id, { opacity });
    }

    // Cleanup para remover referência quando componente desmontar
    return () => {
      if (refMap && refMap.current) {
        refMap.current.delete(item.id);
      }
    };
  }, [item.id, opacity, refMap]);

  const renderRightActions = () => (
    <RectButton style={styles.rightAction}>
      <Ionicons name="trash-outline" size={28} color="#fff" />
    </RectButton>
  );

  return (
    <Swipeable
      friction={3}
      rightThreshold={80}
      renderRightActions={renderRightActions}
      onSwipeableOpen={onDelete}
    >
      <Animated.View style={[styles.card, { opacity }]}>
        <TouchableOpacity
          style={styles.item}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name={item.icon as any} size={20} color="#2357C4" />
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
                  onPress={onDelete}
                >
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#007bff" }]}
                  onPress={onPress}
                >
                  <Text style={styles.buttonText}>Manter</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Linha separadora entre itens */}
        {index !== total - 1 && <View style={styles.separator} />}
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
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
    top: -2,
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
