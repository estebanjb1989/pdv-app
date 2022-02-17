import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const Body = ({ children, light, centered, color, regular, secondaryFont }) => {

  return (
    <Text
      style={[
        style.body,
        light && style.light,
        centered && style.centered,
        color && {
          color,
        },
        regular && {
          fontStyle: "normal",
        },
        secondaryFont && style.secondaryFont,
      ]}
    >
      {children}
    </Text>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  centered: PropTypes.bool,
  color: PropTypes.string,
  regular: PropTypes.bool,
  secondaryFont: PropTypes.bool,
};

Body.defaultProps = {
  light: false,
  centered: false,
  color: null,
  regular: false,
  secondaryFont: false,
};

export default Body;
