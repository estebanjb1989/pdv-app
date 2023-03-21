import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {},
  toggle: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
  },
  selected: {
    backgroundColor: "blue",
  },
  tableNameContainer: {
    minWidth: 90,
    height: 64,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.primary,
  },
});

export default styles;
