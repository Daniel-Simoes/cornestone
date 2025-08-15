import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
 
  return (
    <View style={styles.container}>
      <Text>CornerStone App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});