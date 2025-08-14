import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
 
  return (
    <>
     <StatusBar style="auto" />
     <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)"/>
     </Stack>
    </>
  );
}