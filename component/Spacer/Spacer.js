import React from "react";
import { View } from "react-native";
import styles from "./styles";

const Spacer = ({ size }) => (
  <View
    style={[
      size === "small" && styles.small,
      size === "medium" && styles.medium,
      size === "large" && styles.large,
      size === "huge" && styles.huge,
    ]}
  />
);

export default Spacer;
