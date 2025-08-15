import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
       {/* <StatusBar style="dark" />  */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // garante que não mostre header aqui
            title: '',          // evita mostrar "(tabs)" como título
          }}
        />
      </Stack>
    </>
  );
}
