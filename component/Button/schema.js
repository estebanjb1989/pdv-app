import PropTypes from "prop-types";

export const propTypes = {
  title: PropTypes.string.isRequired,
  light: PropTypes.bool,
  containerStyle: PropTypes.shape({}),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  renderLeftIcon: PropTypes.func,
  renderRightIcon: PropTypes.func,
  disabled: PropTypes.bool,
  bordered: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  justifyStart: PropTypes.bool,
  fetching: PropTypes.bool,
  textColor: PropTypes.string,
};

export const defaultProps = {
  onPress: () => {},
  light: false,
  containerStyle: null,
  titleStyle: null,
  disabled: false,
  renderLeftIcon: null,
  renderRightIcon: null,
  bordered: false,
  width: "100%",
  justifyStart: false,
  fetching: false,
  textColor: null,
};
