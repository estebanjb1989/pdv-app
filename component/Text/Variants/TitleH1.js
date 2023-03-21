import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const TitleH1 = ({ children, light, centered, bold, color }) => {

  return (
    <Text
      light
      style={[
        style.titleH1,
        centered && style.centered,
        light && style.light,
        bold && style.bold,
        color ? { color } : {},
      ]}
    >
      {children}
    </Text>
  );
};

TitleH1.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  centered: PropTypes.bool,
  bold: PropTypes.bool,
  color: PropTypes.string,
};

TitleH1.defaultProps = {
  light: false,
  centered: false,
  bold: false,
  color: null,
};

export default TitleH1;
