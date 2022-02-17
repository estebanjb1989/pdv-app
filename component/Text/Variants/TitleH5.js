import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const TitleH5 = ({ children, light, bold }) => {

  return (
    <Text
      light
      style={[style.titleH5, light && style.light, bold && style.bold]}
    >
      {children}
    </Text>
  );
};

TitleH5.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  bold: PropTypes.bool,
};

TitleH5.defaultProps = {
  light: false,
  bold: false,
};

export default TitleH5;
