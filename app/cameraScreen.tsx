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
  onScan: () => void; // callback para o botão Scanear
};

export default function ModalCameraScreen({ visible, onClose, onScan }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlayCamera}>
        {/* Conteúdo principal */}
        <View style={styles.modalContent}>
          <Image
            source={require("../assets/fuseboard.png")} // ajuste o caminho
            style={styles.image}
          />
          <Text style={styles.instructionText}>
            Vá até o Quadro geral e escaneie o QR code
          </Text>

          {/* Botões inferiores: Fechar à esquerda, Scanear à direita */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={onClose}>
              <Text style={styles.actionButtonText}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.scanButton]} onPress={onScan}>
              <Text style={styles.actionButtonText}>Scanear</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
    marginHorizontal: 5,
  },
  scanButton: {
    backgroundColor: "#28a745", // verde para Scanear
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
