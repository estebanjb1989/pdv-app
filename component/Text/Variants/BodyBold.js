import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import style from "./styles";


const BodyBold = ({
  children,
  light,
  lighter,
  brand,
  fontSize,
  centered,
  color,
  secondaryFont,
  scale,
}) => {

  const [currentFont, setCurrentFont] = useState(fontSize || 16);

  return (
    <Text
      onTextLayout={(e) => {
        if (!scale) return;
        const { lines } = e.nativeEvent;
        if (lines.length > 2) {
          setCurrentFont(currentFont - 1);
        }
      }}
      style={[
        style.bodyBold,
        light && style.light,
        lighter && style.lighter,
        brand && style.brand,
        fontSize && {
          fontSize: currentFont,
        },
        centered && style.centered,
        color && {
          color,
        },
        secondaryFont && style.secondaryFont,
      ]}
    >
      {children}
    </Text>
  );
};

BodyBold.propTypes = {
  children: PropTypes.node,
  light: PropTypes.bool,
  lighter: PropTypes.bool,
  fontSize: PropTypes.number,
  brand: PropTypes.bool,
  centered: PropTypes.bool,
  color: PropTypes.string,
  secondaryFont: PropTypes.bool,
  scale: PropTypes.bool,
};

BodyBold.defaultProps = {
  children: null,
  light: false,
  lighter: false,
  fontSize: 16,
  brand: false,
  centered: false,
  color: null,
  secondaryFont: false,
  scale: false,
};

export default BodyBold;
