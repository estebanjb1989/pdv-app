import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from "../../component";
import styles from "./styles";
import colors from "../../constants/colors";
import { useInventory } from "../../hook";

const ProductLookup = () => {
  const [results, setResults] = useState(null);
  const { loadingInventory, inventory } = useInventory({
    refreshOnLoad: true,
  });

  const handleChangeText = (value) => {
    if (value.length < 3) {
      setResults(null);
      return;
    }
    const data = inventory?.filter((inv) => inv.description.includes(value));
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
          <Input placeholder="Buscar producto" onChange={handleChangeText} />
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
        results.map((item) => (
          <Container
            key={item.description}
            style={{
              backgroundColor: colors.dark2,
              padding: 24,
              marginBottom: 8,
            }}
            onPress={() => alert("agregar al carrito")}
          >
            <Text.Body>{item.description} ${item.price}</Text.Body>
          </Container>
        ))
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
