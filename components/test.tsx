import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";

const { width, height } = Dimensions.get("window");

export default function PdfViewer() {
  const source = require("../assets/1.pdf"); // PDF local na pasta assets

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
        minScale={1.0}         // Zoom mínimo (100%)
        maxScale={5.0}         // Zoom máximo (500%)
        scale={1.0}            // Escala inicial
        spacing={10}           // Espaço entre páginas
        enablePaging={false}   // Scroll contínuo
        horizontal={false}     // Scroll vertical
        enableAnnotationRendering={true} // Renderiza marcações se existirem
        onLoadComplete={(numberOfPages) => {
          console.log(`PDF carregado com ${numberOfPages} páginas`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Página atual: ${page} de ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log("Erro ao carregar PDF:", error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressionado: ${uri}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
  },
});
