
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
 
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>CornerStone App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});