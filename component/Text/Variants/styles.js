import { StyleSheet } from "react-native";
import config from "../../../constants/Config"
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontWeight: "400",
    color: config.tertiaryColor,
  },

  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20.8,
    color: config.tertiaryColor,
  },

  bodyBold: {
    fontWeight: "600",
    fontSize: 16,
    color: config.tertiaryColor,
  },

  huge: {
    fontSize: 72,
    color: config.tertiaryColor,
    paddingTop: 32,
    lineHeight: 64,
  },

  titleH1: {
    fontSize: 34,
    color: config.tertiaryColor,
    lineHeight: 40,
  },

  titleH2: {
    fontSize: 24,
    color: config.tertiaryColor,
  },

  titleH3: {
    fontSize: 20,
    color: config.tertiaryColor,
  },

  titleH4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22.32,
    color: config.tertiaryColor,
  },

  titleH5: {
    fontSize: 13,
    lineHeight: 28,
    color: config.tertiaryColor,
  },

  bold: {
    fontWeight: "400",
  },

  light: {
    color: config.tertiaryColor,
  },

  lighter: {
    color: config.tertiaryColor,
    fontWeight: "500",
  },

  regular: {
    color: config.tertiaryColor,
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
