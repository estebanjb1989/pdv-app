import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  dash: {
    width: 36,
    height: 6,
    backgroundColor: colors.text,
    marginTop: 12,
    borderRadius: 8,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.shadow,
    width: "100%",
    height: "100%",
  },
  menu: {
    position: "absolute",
    bottom: -56,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeSurface: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  modal: {
    margin: 0,
  },
  wrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  content: {
    backgroundColor: colors.dark,
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  head: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.text,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  swipeIndicator: {
    width: 32,
    height: 4,
    borderRadius: 8,
    backgroundColor: colors.text,
  },

  contentHead: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingTop: 22,
    paddingBottom: 16,
    alignItems: "center",
  },

  contentHeadText: {
    fontFamily: "IBMPlexSans",
    color: colors.branding,
    fontSize: 16,
  },
});

export default styles;
