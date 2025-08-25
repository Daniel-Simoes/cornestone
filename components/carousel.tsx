import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = 16;
const ITEM_SIZE = CARD_WIDTH + CARD_SPACING;

type Carousel = {
  id: string;
  title: string;
  subtitle: string;
  image: any;
};

const originalData: Carousel[] = [
  {
    id: "1",
    title: "Docs Shared",
    subtitle: "Electrical & Mechanical Schemes",
    image: require("../assets/pdf.png"),
  },
  {
    id: "2",
    title: "Project Files",
    subtitle: "Architecture & Planning",
    image: require("../assets/electrical.png"),
  },
  {
    id: "3",
    title: "Reports",
    subtitle: "Financial Overview",
    image: require("../assets/certs.png"),
  },
];

// duplicar dados
const data = [...originalData, ...originalData];

export default function Carousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  // Scroll para o segundo item (índice 1) após layout
  const handleLayout = () => {
    flatListRef.current?.scrollToOffset({
      offset: ITEM_SIZE, // índice 1 * largura do item
      animated: false,
    });
  };

  const handleMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const totalWidth = ITEM_SIZE * originalData.length;

    if (contentOffsetX >= totalWidth) {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        onLayout={handleLayout} // 👈 scrolla pro segundo item aqui
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.05, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ scale }],
                  marginRight: CARD_SPACING,
                },
              ]}
            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </Animated.View>
          );
        }}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {originalData.map((_, i) => {
          const inputRange = [
            (i - 1) * ITEM_SIZE,
            i * ITEM_SIZE,
            (i + 1) * ITEM_SIZE,
          ];
          const dotScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.5, 0.8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { transform: [{ scale: dotScale }] }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  imageContainer: {
    height: 200,
    backgroundColor: "yellow",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007bff",
    margin: 4,
  },
});
