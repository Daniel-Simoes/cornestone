import PdfScreen from '@/components/test';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
 
  return (
    <PdfScreen />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  }
});