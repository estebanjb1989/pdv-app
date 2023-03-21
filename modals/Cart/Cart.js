import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, DataTable } from "../../component";
import { useSelector } from "react-redux";
import styles from "./styles";

const Cart = () => {
  const cart = useSelector((state) => state.cart.list);
  const [data, setData] = useState([]);

  useEffect(() => {
    const cartQuantities = cart.reduce((carry, item) => {
      return {
        ...carry,
        [item.slug]: { ...item, quantity: item.quantity + 1 },
      };
    }, {});
    const keys = Object.keys(cartQuantities);
    const result = [];
    for (const key of keys) {
      result.push(cartQuantities[key]);
    }

    setData(result);

  }, [cart]);

  return (
    <Container padded style={styles.container}>
      <Text.TitleH3>Carrito</Text.TitleH3>
      <Spacer.Medium />
      <Container>
        <DataTable
          dataSource={data}
          columns={[
            {
              key: "description",
              title: "Producto",
              width: 120,
            },
            {
              key: "price",
              title: "Precio",
              width: 80,
            },
            {
              key: "quantity",
              title: "Cantidad",
              width: 80,
            },
          ]}
        />
        <Spacer.Large />
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
