import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = 16;
const ITEM_SIZE = CARD_WIDTH + CARD_SPACING;

type CarouselItem = {
  id: string;
  category: string;
  title: string;
  image: any;
};

type CarouselProps = {
  data: CarouselItem[];
  onChangeActiveItem: (index: number) => void;
};

export default function Carousel({ data, onChangeActiveItem }: CarouselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  const dataLength = data.length;
  // Triplicamos a lista pra criar loop infinito
  const duplicatedData = [...data, ...data, ...data];
  const initialScrollIndex = dataLength;

  const handleLayout = () => {
    flatListRef.current?.scrollToOffset({
      offset: ITEM_SIZE * initialScrollIndex,
      animated: false,
    });
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let offsetX = event.nativeEvent.contentOffset.x;
    let currentIndex = Math.round(offsetX / ITEM_SIZE);

    if (currentIndex < dataLength) {
      currentIndex += dataLength;
      flatListRef.current?.scrollToOffset({
        offset: currentIndex * ITEM_SIZE,
        animated: false,
      });
    } else if (currentIndex >= dataLength * 2) {
      currentIndex -= dataLength;
      flatListRef.current?.scrollToOffset({
        offset: currentIndex * ITEM_SIZE,
        animated: false,
      });
    }

    onChangeActiveItem(currentIndex % dataLength);
  };

  // Aqui normalizamos scrollX pra refletir índice real do array original
  const normalizedScrollX = Animated.modulo(
    Animated.divide(scrollX, ITEM_SIZE),
    dataLength
  );

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          marginRight: CARD_SPACING,
        }}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={duplicatedData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        onLayout={handleLayout}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItem}
      />

      <View style={styles.pagination}>
        {data.map((_, i) => {
          // Agora usamos normalizedScrollX pra paginação acompanhar o item certo
          const dotScale = normalizedScrollX.interpolate({
            inputRange: [i - 1, i, i + 1],
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
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    padding: 12,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
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
