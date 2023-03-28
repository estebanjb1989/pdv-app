import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import colors from "../../constants/colors";

export const Cluster = styled.View`
  background-color: ${({ theme }) => {
    console.log(theme)
    return theme.card;
  }};
`;

const styles = StyleSheet.create({
  menuItem: {
    width: 128,
    height: 128,
    borderRadius: 16,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemMobile: {
    width: 240,
    height: 80,
    borderRadius: 16,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.dark
  },
  menuItemLookup: {
    backgroundColor: colors.dark,
    padding: 8,
    width: 260,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});

export default styles;
