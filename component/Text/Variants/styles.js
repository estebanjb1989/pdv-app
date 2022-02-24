import { StyleSheet } from "react-native";
import colors from "../../../constants/colors"

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontWeight: "400",
    color: 'lightgrey',
  },

  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20.8,
    color: 'lightgrey',
  },

  bodyBold: {
    fontWeight: "600",
    fontSize: 16,
    color: 'lightgrey',
  },

  huge: {
    fontSize: 72,
    color: 'lightgrey',
    paddingTop: 32,
    lineHeight: 64,
  },

  titleH1: {
    fontSize: 34,
    color: 'lightgrey',
    lineHeight: 40,
  },

  titleH2: {
    fontSize: 24,
    color: 'lightgrey',
  },

  titleH3: {
    fontSize: 20,
    color: 'lightgrey',
  },

  titleH4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22.32,
    color: 'lightgrey',
  },

  titleH5: {
    fontSize: 13,
    lineHeight: 28,
    color: 'lightgrey',
  },

  bold: {
    fontWeight: "400",
  },

  light: {
    color: colors.white,
  },

  lighter: {
    color: colors.white,
    fontWeight: "500",
  },

  regular: {
    color: 'lightgrey',
  },

  centered: {
    textAlign: "center",
  },

  muted: {
    color: colors.blueSoft,
  },

  brand: {
    color: colors.primary,
  },

});

export default styles;
