import { StyleSheet } from "react-native";
import colors from 'constants/colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
  },
  toggle: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
  },
  selected: {
    backgroundColor: colors.primaryBrand,
  },
imageContainer: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 5,
    overflow: "hidden",
},
image: {
    width:120,
    height:120,
    borderRadius: 8,
},
input: {
    width: 240,
    height: 44,
    backgroundColor: 'grey',
    padding: 12,
    borderRadius: 8,
},
imagePlaceholder: {
  backgroundColor: 'grey',
  width:120,
  height:120,
  borderRadius: 8,
}
});

export default styles;
