import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import Container from "../Container";
import { Text, TouchableOpacity } from "react-native";
import { propTypes, defaultProps } from "./schema";
import styles from "./styles";

const Button = ({
  title,
  onPress,
  containerStyle,
  titleStyle,
  renderLeftIcon,
  renderRightIcon,
  disabled,
  bordered,
  width,
  justifyStart,
  justifyCenter,
  justifyEnd,
  fetching,
  backgroundColor
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      containerStyle,
      backgroundColor && { backgroundColor },
      width && {
        width,
        maxWidth: width,
      },
    ]}
  >
    <Container
      style={[disabled && styles.disabled, bordered && styles.bordered ]}
      row
      alignCenter
      justifyEnd={justifyEnd}
      justifyCenter={justifyCenter}
      justifyStart={justifyStart}
    >
      {renderLeftIcon && (
        <View style={styles.iconContainer}>{renderLeftIcon()}</View>
      )}
      {fetching && (
        <Container paddingX={0.3}>
          <ActivityIndicator />
        </Container>
      )}
      <Text style={titleStyle}>{title}</Text>
      {renderRightIcon && (
        <View style={styles.iconContainer}>{renderRightIcon()}</View>
      )}
    </Container>
  </TouchableOpacity>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
