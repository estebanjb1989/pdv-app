import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1.7,
    elevation: 2,
  },
});

export default styles;
