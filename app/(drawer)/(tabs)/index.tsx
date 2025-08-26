import Carousel from "@/components/carousel";
import CarouselSupport from "@/components/carouselSupport";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const data = [
  {
    id: "1",
    title: "Schematics PDF's Files",
    category: "Drawings and Plans",
    subCategory: ["General Services", "Lighting & Protective Services", "Distribution Schematics"],
    image: require("../../../assets/2d.png"),
  },
  {
    id: "2",
    title: "Individual Circuit Apresentation",
    category: "3D Simulation",
    subCategory: ["Lighting", "Sockets", "Heating","Cooker","TV", "Internet"],
    image: require("../../../assets/pdf.png"),
  },
  {
    id: "3",
    title: "Financial Overview",
    category: "Certificates and Warrants",
    subCategory: ["Datasheets", "Viability Certs"],
    image: require("../../../assets/certs.png"),
  },
];

export default function RootLayout() {
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
    backgroundColor: "#f5f5f5",
  },
});
