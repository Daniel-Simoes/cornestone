import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
 
  return (
    <>
     <StatusBar style="auto" />
     <View style={styles.container}>
        <TouchableOpacity style={styles.botao} onPress={() => Alert.alert('Botão pressionado!')}>
          <Text style={styles.texto}>Open Camera</Text>
        </TouchableOpacity>
     </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  botao: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});