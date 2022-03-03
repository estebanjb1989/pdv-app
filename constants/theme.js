import colors from "./colors";

export const Theme = {
  Dark: "dark",
  Light: "light",
};

export const light = {
  background: colors.primaryColor,
  card: colors.secondaryColor,
  text: colors.tertiaryColor,
  border: colors.tertiaryColor,
};

export const dark = {
  background: colors.dark,
  card: colors.dark,
  text: colors.white,
  border: colors.midGrey,
};
