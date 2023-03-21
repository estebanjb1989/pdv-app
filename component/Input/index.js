import React from "react";
import { TextInput } from "react-native";
import Container from "../Container";
import Text from "../Text";
import Spacer from "../Spacer";
import styles from "./styles";
import colors from "../../constants/colors";

const Input = ({ label, autoFocus, secure, placeholder, onChange, style }) => {
  return (
    <Container>
      {label && (
        <Container>
          <Spacer.Medium />
          <Text.Small color={colors.secondary}>{label}</Text.Small>
          <Spacer.Small />
        </Container>
      )}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        autoFocus={autoFocus}
        style={[styles.input]}
        onChangeText={onChange}
      />
    </Container>
  );
};

export default Input;
