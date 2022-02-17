import { StyleSheet } from "react-native";
import colors from 'constants/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
  },
  toggle: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
  },
  selected: {
    backgroundColor: colors.primaryBrand,
  },
});

export default styles;
