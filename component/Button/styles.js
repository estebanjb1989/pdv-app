import { StyleSheet } from "react-native";
import colors from '../../constants/colors'
import layout from "../../styles/layout";

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.secondary,

    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.tertiary,
    borderWidth: 1,
    flexDirection: "row",
    ...layout.shadow,
  },

  primaryTitle: {
    
    color: colors.tertiary,
    textAlign: "center",
  },

  primaryTitleLight: {
    fontWeight: "600",
  },

  primaryInvertedButton: {
    backgroundColor: colors.white,
  },

  primaryInvertedText: {
    color: colors.primaryBrand,
    fontWeight: "600",
  },

  secondary: {
    backgroundColor: colors.secondary,
    width: "100%",
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    borderWidth: 0,
    ...layout.shadow,
  },

  secondaryTitle: {
    
    color: colors.oceanBlue,
    fontWeight: "bold",
  },

  tertiary: {
    height: 24,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: colors.tertiary
  },

  tertiaryTitle: {
    
    color: colors.tertiary,
    fontWeight: "600",
  },

  tertiaryLight: {
    color: colors.tertiary,
  },

  tertiaryLighter: {
    color: colors.tertiary,
    fontWeight: "600",
  },

  tertiaryContrast: {
    color: colors.white,
    fontWeight: "600",
  },

  iconContainer: {
    paddingHorizontal: 12,
  },

  disabled: {
    opacity: 0.5,
  },

  bordered: {
    borderWidth: 1,
    borderColor: colors.primaryBrand,
  },
});

export default styles;
