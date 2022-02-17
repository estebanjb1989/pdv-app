import { StyleSheet } from "react-native";
import colors from "../../../constants/colors"

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontWeight: "400",
    color: 'gold',
  },

  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20.8,
    color: 'gold',
  },

  bodyBold: {
    fontWeight: "600",
    fontSize: 16,
    color: 'gold',
  },

  huge: {
    fontSize: 72,
    color: 'gold',
    paddingTop: 32,
    lineHeight: 64,
  },

  titleH1: {
    fontSize: 34,
    color: 'gold',
    lineHeight: 40,
  },

  titleH2: {
    fontSize: 24,
    color: 'gold',
  },

  titleH3: {
    fontSize: 20,
    color: 'gold',
  },

  titleH4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22.32,
    color: 'gold',
  },

  titleH5: {
    fontSize: 13,
    lineHeight: 28,
    color: 'gold',
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
    color: 'gold',
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
