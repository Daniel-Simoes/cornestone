import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

const CustomHeader = () => {

  return (
    <View style={styles.header}>
      {/* Botão do Drawer */}
      <TouchableOpacity>
        <Image
          source={require('../assets/cornerstoneIcon.png')} // ícone do menu
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Espaço central opcional, se quiser título */}
      <View style={{ flex: 1 }} />

      {/* Avatar de perfil */}
      <TouchableOpacity>
        <Image
          source={require('../assets/cornerstoneIcon.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: 140,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

export default CustomHeader;