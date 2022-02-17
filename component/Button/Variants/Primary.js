import React from "react";
import { StyleSheet } from "react-native";
import styles from "../styles";
import Button from "../Button";
import { propTypes, defaultProps } from "../schema";

const Primary = ({
  title,
  light,
  disabled,
  onPress,
  renderRightIcon,
  renderLeftIcon,
  width,
  inverted,
  bordered,
  fetching,
  fetchingColor,
  textColor,
  backgroundColor
}) => (
  <Button
    onPress={onPress}
    backgroundColor={backgroundColor}
    title={title}
    containerStyle={StyleSheet.flatten([
      styles.primary,
      inverted && styles.primaryInvertedButton,
      bordered && styles.bordered,
      { paddingHorizontal: 12 },
    ])}
    titleStyle={[
      styles.primaryTitle,
      light && styles.primaryTitleLight,
      inverted && styles.primaryInvertedText,
      textColor && {
        color: textColor,
      },
    ]}
    width={width}
    disabled={disabled}
    renderLeftIcon={renderLeftIcon}
    renderRightIcon={renderRightIcon}
    fetching={fetching}
    fetchingColor={fetchingColor}
  />
);

Primary.propTypes = propTypes;
Primary.defaultProps = {
  ...defaultProps,
  light: true,
};

export default Primary;
