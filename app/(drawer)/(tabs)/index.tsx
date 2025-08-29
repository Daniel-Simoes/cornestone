import Carousel from "@/components/carousel";
import CarouselSupport from "@/components/carouselSupport";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const data = [
  {
    id: "1",
    title: "Schematics PDF's Files",
    category: "Drawings and Plans",
    subCategory: [
      { name: "General Services", content: "2d.png" },
      { name: "Lighting & Protective Services", content: "" },
      { name: "Distribution Schematics", content: "" },
    ],
    image: require("../../../assets/2d.png"),
  },
  {
    id: "2",
    title: "Individual Circuit Apresentation",
    category: "3D Simulation",
    subCategory: [
      { name: "Lighting", content: "3D layout of lighting circuits" },
      { name: "Sockets", content: "3D layout of sockets" },
      { name: "Heating", content: "Heating overview" },
      { name: "Cooker", content: "Oven/Cooker electrical details" },
      { name: "TV", content: "TV points" },
      { name: "Internet", content: "Network layout" },
    ],
    image: require("../../../assets/pdf.png"),
  },
  {
    id: "3",
    title: "Financial Overview",
    category: "Certificates and Warrants",
    subCategory: [
      { name: "Datasheets", content: "Manufacturer technical documents" },
      { name: "Viability Certs", content: "Feasibility documentation" },
    ],
    image: require("../../../assets/certs.png"),
  },
];

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
        items={data[activeIndex].subCategory} // passa os objetos diretamente
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
