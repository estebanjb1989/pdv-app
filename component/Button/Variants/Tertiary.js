import React from "react";
import PropTypes from "prop-types";
import styles from "../styles";
import Button from "../Button";
import { propTypes, defaultProps } from "../schema";
import colors from "../../../constants/colors";

const Tertiary = ({
  title,
  onPress,
  light,
  lighter,
  contrast,
  disabled,
  justifyStart,
  justifyCenter,
  justifyEnd,
  width,
  renderRightIcon,
  renderLeftIcon,
  fetching,
  color,
}) => (
  <Button
    title={title}
    containerStyle={styles.tertiary}
    width={width}
    titleStyle={[
      styles.tertiaryTitle,
      color && {
        color,
      },
      light && styles.tertiaryLight,
      lighter && styles.tertiaryLighter,
      contrast && styles.tertiaryContrast,
    ]}
    disabled={disabled}
    justifyStart={justifyStart}
    justifyCenter={justifyCenter}
    justifyEnd={justifyEnd}
    onPress={onPress}
    renderLeftIcon={renderLeftIcon}
    renderRightIcon={renderRightIcon}
    fetching={fetching}
  />
);

Tertiary.propTypes = {
  ...propTypes,
  color: PropTypes.string,
};
Tertiary.defaultProps = {
  ...defaultProps,
  color: colors.black,
};

export default Tertiary;
