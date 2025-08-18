import Carousel from '@/components/carousel';
import CarouselSupport from '@/components/carouselSupport';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
 
  return (
    <>
      <Carousel />
      <CarouselSupport />
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  }
});