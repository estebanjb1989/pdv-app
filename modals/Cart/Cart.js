import React from "react";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button } from '../../component'
import styles from "./styles";

const Cart = ({ sale }) => {
  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Spacer.Huge />
        <Text.BodyBold>{JSON.stringify(sale)}</Text.BodyBold>
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

Cart.propTypes = {
  text: PropTypes.string,
};

Cart.defaultProps = {
  text: null,
};

export default Cart;
