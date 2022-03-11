import colors from "./colors";

export const Theme = {
  Dark: "dark",
  Light: "light",
};

export const light = {
  background: colors.dark,
  card: colors.secondaryColor,
  text: colors.tertiaryColor,
  border: colors.primary,
};

export const dark = {
  background: colors.dark,
  card: colors.dark,
  text: colors.white,
  border: colors.midGrey,
};
