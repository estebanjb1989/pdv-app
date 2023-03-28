import React from "react";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button } from '../../component'
import styles from "./styles";

const ProductDetail = ({ text }) => {
  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Spacer.Huge />
        <Text.BodyBold>{text}</Text.BodyBold>
        <Spacer.Large />
        <Button.Tertiary
          justifyCenter
          title="OK"
          onPress={() => {
            alert(1)
          }}
        />
        <Spacer.Huge />
      </Container>
    </Container>
  );
};

ProductDetail.propTypes = {
  text: PropTypes.string,
};

ProductDetail.defaultProps = {
  text: null,
};

export default ProductDetail;
