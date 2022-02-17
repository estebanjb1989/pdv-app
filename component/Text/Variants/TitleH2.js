import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const TitleH2 = ({ children, light, bold }) => {
  
  return (
    <Text style={[style.titleH2, light && style.light, bold && style.bold]}>
      {children}
    </Text>
  );
};

TitleH2.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  bold: PropTypes.bool,
};

TitleH2.defaultProps = {
  light: false,
  bold: false,
};

export default TitleH2;
