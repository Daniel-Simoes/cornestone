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
        headerTitleStyle: {
          color: '#000',
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
            headerStyle: {
              backgroundColor: '#000', // fundo preto
            },
            headerTitleStyle: {
              color: '#fff', // título branco
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back-outline"
                  size={26}
                  color="#fff" // ícone branco
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log('Info pressed')}>
                <Ionicons
                  name="information-circle-outline"
                  size={26}
                  color="#fff" // ícone branco
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack>
  );
}
