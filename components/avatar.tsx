import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const Avatar = ({ onPress }: { onPress?: () => void }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={require('../assets/avatar.png')}
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
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});

export default Avatar;
