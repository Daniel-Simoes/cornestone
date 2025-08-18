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

// duplicamos os dados pra simular looping infinito
const data = [...originalData, ...originalData];

export default function Carousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  // detectar fim do scroll e resetar posição pro início (loop)
  const handleMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const totalWidth = (CARD_WIDTH + CARD_SPACING) * originalData.length;

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
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + CARD_SPACING),
            index * (CARD_WIDTH + CARD_SPACING),
            (index + 1) * (CARD_WIDTH + CARD_SPACING),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.05, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
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
            (i - 1) * (CARD_WIDTH + CARD_SPACING),
            i * (CARD_WIDTH + CARD_SPACING),
            (i + 1) * (CARD_WIDTH + CARD_SPACING),
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
    paddingTop:10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden", // garante borda arredondada
  },
  imageContainer: {
    height: 200,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
