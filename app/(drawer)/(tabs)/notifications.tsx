
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

export default function Notifications() {
 
  return (
    <View style={styles.container}>
     
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
});