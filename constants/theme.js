import colors from "./colors";

export const Theme = {
  Dark: "dark",
  Light: "light",
};

// cambiar los colores y ver como cambia en el resto de la app
export const light = {
  primary: colors.primary,
  primaryDark: colors.primary,
  secondary: colors.primary,
  tertiary: colors.primary,
  background: colors.dark, // ALL SCREENS
  card: colors.dark, // TOP NAVBAR
  text: colors.text,
  textLight: colors.white,
  border: colors.text,
};

export const dark = {
  primary: colors.primaryBrand,
  primaryDark: colors.primaryBrandDark,
  secondary: colors.secondaryBrand,
  tertiary: colors.tertiaryBrand,
  background: colors.dark,
  card: colors.dark,
  text: colors.white,
  textLight: colors.white,
  border: colors.midGrey,
};
