import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";

const Small = ({
  children,
  light,
  lighter,
  muted,
  centered,
  brand,
  bold,
  color,
  numberOfLines,
  fontSize,
}) => {
  return (
    <Text
      style={[
        style.small,
        light && style.light,
        lighter && style.lighter,
        muted && style.muted,
        centered && style.centered,
        brand && style.brand,
        bold && style.bold,
        color && {
          color,
        },
        fontSize && {
          fontSize,
        },
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

Small.propTypes = {
  children: PropTypes.node.isRequired,
  light: PropTypes.bool,
  lighter: PropTypes.bool,
  muted: PropTypes.bool,
  centered: PropTypes.bool,
  brand: PropTypes.bool,
  bold: PropTypes.bool,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
  fontSize: PropTypes.number,
};

Small.defaultProps = {
  light: false,
  lighter: false,
  muted: false,
  centered: false,
  brand: false,
  bold: false,
  color: null,
  numberOfLines: 3,
  fontSize: null,
};

export default Small;
