import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const TitleH3 = ({ color, children, light, bold, brand }) => {

  return (
    <Text
      style={[
        style.titleH3,
        {
          ...color && { color }
        }
      ]}
    >
      {children}
    </Text>
  );
};

TitleH3.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  bold: PropTypes.bool,
  brand: PropTypes.bool,
};

TitleH3.defaultProps = {
  color: null,
  light: false,
  bold: false,
  brand: false,
};

export default TitleH3;
