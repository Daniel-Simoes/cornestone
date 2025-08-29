import React from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

export default function RootLayout() {
  const source = require("../assets/sockets.pdf"); // PDF local na pasta assets

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
        minScale={1.0}
        maxScale={5.0}
        scale={1.0}
        spacing={10}
        enablePaging={false}
        horizontal={false}
        enableAnnotationRendering={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#000",
    marginTop:-20
  },
});
