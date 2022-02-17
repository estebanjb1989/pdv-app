import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const TitleH4 = ({ children, light, bold }) => {

  return (
    <Text
      light
      style={[style.titleH4, light && style.light, bold && style.bold]}
    >
      {children}
    </Text>
  );
};

TitleH4.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  bold: PropTypes.bool,
};

TitleH4.defaultProps = {
  light: false,
  bold: false,
};

export default TitleH4;
