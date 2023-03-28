import React, { useMemo, useState } from "react";
import { Image } from "react-native-web";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from "../../component";
import styles from "./styles";
import colors from "../../constants/colors";
import { useInventory } from "../../hook";
import { useSelector } from "react-redux";
import DetailAsset from "../../assets/detail.png";

const ProductLookup = ({ onSubmit }) => {
  const [results, setResults] = useState(null);
  const { loadingInventory, inventory } = useInventory({
    refreshOnLoad: true,
  });
  const cart = useSelector(({ cart }) => cart.list);

  const handleChangeText = (value) => {
    if (value.length < 3) {
      setResults(null);
      return;
    }
    const data = inventory?.filter((inv) =>
      inv.description.toUpperCase().includes(value.toUpperCase())
    );
    setResults(data);
  };

  return (
    <Container flex alignCenter>
      <Container row alignCenter justifyCenter fullWidth>
        <Container
          style={{
            width: 240,
          }}
        >
          <Input
            autoFocus
            placeholder="Buscar producto"
            onChange={handleChangeText}
          />
        </Container>
        {/* <Container
          style={{
            marginLeft: 12,
          }}
        >
          <Button.Primary title="Buscar" />
        </Container> */}
      </Container>

      <Spacer.Large />
      {!results?.length ? (
        <Text.Body>No hay resultados para mostrar</Text.Body>
      ) : (
        <Container styles={styles.container}>
          {results.map((item) => (
            <Container row alignCenter>
              <Container
                key={item.description}
                style={{
                  backgroundColor: colors.dark2,
                  padding: 24,
                  marginBottom: 8,
                  width: 300,
                }}
                onPress={() => onSubmit(item, cart)}
                row
                spaceBetween
                alignCenter
              >
                <Container
                  style={{
                    maxWidth: "80%",
                  }}
                >
                  <Text.Body>{item.description}</Text.Body>
                </Container>
                <Text.Body>${item.price}</Text.Body>
              </Container>
              <Container row>
                <Spacer.Medium />
                <Container onPress={() => alert('detailel')}>
                  <Image
                    source={DetailAsset}
                    style={{
                      width: 56,
                      height: 56,
                    }}
                  />
                </Container>
              </Container>
            </Container>
          ))}
        </Container>
      )}
      <Spacer.Large />
    </Container>
  );
};

ProductLookup.propTypes = {
  text: PropTypes.string,
};

ProductLookup.defaultProps = {
  text: null,
};

export default ProductLookup;
