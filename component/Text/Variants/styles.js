import { StyleSheet } from "react-native";
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.text,
  },

  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 20.8,
    color: colors.text,
  },

  bodyBold: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.text,
  },

  huge: {
    fontSize: 72,
    color: colors.text,
    paddingTop: 32,
    lineHeight: 64,
  },

  titleH1: {
    fontSize: 34,
    color: colors.text,
    lineHeight: 40,
  },

  titleH2: {
    fontSize: 24,
    color: colors.text,
  },

  titleH3: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center'
  },

  titleH4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 22.32,
    color: colors.text,
  },

  titleH5: {
    fontSize: 13,
    lineHeight: 28,
    color: colors.text,
  },

  bold: {
    fontWeight: "400",
  },

  light: {
    color: colors.text,
  },

  lighter: {
    color: colors.text,
    fontWeight: "500",
  },

  regular: {
    color: colors.text,
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
