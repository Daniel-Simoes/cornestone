import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import ProfileModal from "./modals/profile";

type AvatarProps = {
  size?: number;
  clickable?: boolean; // Nova prop: habilita o modal
};

export default function Avatar({ size = 36, clickable = false }: AvatarProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (clickable) setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {clickable ? (
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../assets/avatar.png")}
            style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
          />
        </TouchableOpacity>
      ) : (
        <Image
          source={require("../assets/avatar.png")}
          style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        />
      )}

      {/* Modal */}
      {clickable && (
        <ProfileModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          avatarSize={size * 2.77}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end" },
  avatar: { borderWidth: 1, borderColor: "white" },
});
