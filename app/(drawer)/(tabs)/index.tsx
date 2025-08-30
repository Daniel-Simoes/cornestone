import Carousel from "@/components/carousel";
import CarouselSupport from "@/components/carouselSupport";
import { data } from "@/data";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        onChangeActiveItem={setActiveIndex}
      />
      <CarouselSupport
        title={data[activeIndex].category}
        items={data[activeIndex].subCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
