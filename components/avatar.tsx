import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const Avatar = ({ onPress }: { onPress?: () => void }) => {
  return (
    // <View style={styles.header}>
    //   <TouchableOpacity onPress={onPress}>
    //     <Image
    //       source={require('../assets/avatar.png')}
    //       style={styles.avatar}
    //     />
    //   </TouchableOpacity>
    // </View>
    <View style={styles.headerRight}>
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/avatar.png')}
        style={styles.avatarRight}
      />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  
  },
  avatarRight: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth:1,
    borderColor:"white"
  },

    // headerRight: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   paddingHorizontal: 16,
  
  // },
  // avatarRight: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40,
  //   borderWidth:1,
  //   borderColor:"white"
  // },
});

export default Avatar;
