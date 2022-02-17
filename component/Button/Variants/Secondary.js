import React from "react";
import styles from "../styles";
import Button from "../Button";
import { propTypes, defaultProps } from "../schema";

const Secondary = ({ title, onPress, renderLeftIcon }) => (
  <Button
    onPress={onPress}
    title={title}
    containerStyle={styles.secondary}
    titleStyle={styles.secondaryTitle}
    renderLeftIcon={renderLeftIcon}
  />
);

Secondary.propTypes = propTypes;
Secondary.defaultProps = defaultProps;

export default Secondary;
