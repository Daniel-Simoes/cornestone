import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      {/* Tabs: sem header */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* Drawer: sem header, mas desabilita texto do back */}
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
          headerBackTitle: '',
        }}
      />

      {/* pdfScreen: título dinâmico e botão voltar funcionando */}
      <Stack.Screen
        name="pdfScreen"
        options={({ navigation, route }) => {
          const title = route?.params?.title || 'PDF';

          return {
            headerTitle: title,
            headerBackTitle: '',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <Ionicons
                  name="arrow-back-outline"
                  size={26}
                  color="#007bff"
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('Info pressed')} >
                <Ionicons
                  name="information-circle-outline"
                  size={26}
                  color="#007bff"
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack>
  );
}
