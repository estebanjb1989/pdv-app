import React, { useState } from "react";
import { Picker } from "react-native";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from "../../component";
import { useSelector } from "react-redux";
import styles from "./styles";

const AddClient = ({ onSubmit }) => {
  const [name, setName] = useState(null);
  const [role, setRole] = useState("waiter");

  return (
    <Container style={styles.container}>
      <Container alignCenter>
        <Container>
          <Text.TitleH3>NUEVO AMIGO DE LA CASA</Text.TitleH3>
          <Spacer.Medium />
        </Container>

        <Container row spaceBetween>
          <Container>
            <Input label="Nombre" onChange={(text) => setName(text)} />
          </Container>
          <Spacer.Small />
          <Container>
            <Input label="Apellido" onChange={(text) => setName(text)} />
          </Container>
        </Container>

        <Container row spaceBetween>
          <Container>
            <Input label="Direccion" onChange={(text) => setName(text)} />
          </Container>
          <Spacer.Small />
          <Container>
            <Input label="Telefono" onChange={(text) => setName(text)} />
          </Container>
        </Container>

        <Container row spaceBetween>
          <Container>
            <Input label="Tipo Doc." onChange={(text) => setName(text)} />
          </Container>
          <Spacer.Small />
          <Container>
            <Input label="Doc." onChange={(text) => setName(text)} />
          </Container>
        </Container>
    
        <Container fullWidth>
          <Spacer.Large />
          <Button.Primary
            title="Guardar"
            onPress={() => {
              if (!name?.length) {
                alert("Por favor, ingrese el nombre");
                return;
              }
              if (!role?.length) {
                alert("Por favor, ingrese el rol de usuario");
                return;
              }
              onSubmit({
                name,
                role,
              });
            }}
          />
        </Container>
      </Container>
    </Container>
  );
};

AddClient.propTypes = {
  text: PropTypes.string,
};

AddClient.defaultProps = {
  text: null,
};

export default AddClient;
