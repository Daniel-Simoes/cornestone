import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalCameraScreen({ visible, onClose }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlayCamera}>
        {/* Botão de Fechar no canto superior direito */}
        <TouchableOpacity style={styles.closeIconOverlay} onPress={onClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Conteúdo principal */}
        <View style={styles.modalContent}>
          <Image
            source={require("../assets/fuseboard.png")} // ajuste o caminho conforme sua estrutura
            style={styles.image}
          />
          <Text style={styles.instructionText}>
            Vá até o Quadro geral e escaneie o QR code
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlayCamera: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIconOverlay: {
    position: "absolute",
    top: "40%",
    right: 20,
    zIndex: 1,
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    resizeMode: "contain",
    marginBottom: 20,
  },
  instructionText: {
    textAlign: "center",
    fontSize: 15,
    color: "#333",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
