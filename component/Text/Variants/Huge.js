import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const Huge = ({ children, light, bold, lineHeight, color }) => {
  const [currentFont, setCurrentFont] = useState(56);

  return (
    <Text
      light
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > 2) {
          setCurrentFont(currentFont - 1);
        }
      }}
      style={[
        style.huge,
        light && style.light,
        bold && style.bold,
        lineHeight && {
          lineHeight,
        },
        color && {
          color,
        },
      ]}
    >
      {children}
    </Text>
  );
};

Huge.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  bold: PropTypes.bool,
  lineHeight: PropTypes.number,
  color: PropTypes.string,
};

Huge.defaultProps = {
  light: false,
  bold: false,
  lineHeight: null,
  color: null,
};

export default Huge;
