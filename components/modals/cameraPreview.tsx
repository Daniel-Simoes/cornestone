import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CameraPreviewProps = {
  visible: boolean;
  onClose: () => void;
  onScan: () => void;
};

export default function CameraPreview({ visible, onClose, onScan }: CameraPreviewProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlayCamera}>
        <View style={styles.modalContent}>
          <Image
            source={require("../../assets/fuseboard.png")}
            style={{
              width: Dimensions.get("window").width * 0.5,
              height: Dimensions.get("window").width * 0.5,
              resizeMode: "contain",
              marginBottom: 20,
            }}
          />
          <Text style={{ textAlign: "center" }}>
            Vá até o Quadro geral e escaneie o QR code
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionButton, styles.closeBtn]} onPress={onClose}>
              <Text style={styles.actionButtonText}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.scanBtn]} onPress={onScan}>
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
    backgroundColor: "rgba(0,0,0,0.93)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 280,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  closeBtn: { backgroundColor: "#007bff" },
  scanBtn: { backgroundColor: "#28a745" },
  actionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
