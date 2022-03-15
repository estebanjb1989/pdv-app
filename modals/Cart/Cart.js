import React from "react";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, DataTable } from '../../component'
import { useSelector } from 'react-redux'
import styles from "./styles";

const Cart = () => {
  const cart = useSelector(state => state.cart.list)

  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Spacer.Huge />
        <DataTable 
          dataSource={cart}
          columns={[
            {
              key: 'description',
              title: 'Producto',
            }
          ]}
        />
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
