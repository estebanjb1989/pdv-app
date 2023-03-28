import React, { useState } from "react";
import { Picker } from "react-native";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from "../../component";
import { useSelector } from "react-redux";
import { useClients } from "../../hook";
import styles from "./styles";

const AddClient = ({ onSubmit }) => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [email, setEmail] = useState(null);

  const { submit } = useClients();

  return (
    <Container style={styles.container}>
      <Container alignCenter>
        <Container>
          <Text.TitleH3>NUEVO CLIENTE</Text.TitleH3>
          <Spacer.Medium />
        </Container>

        <Container row spaceBetween>
          <Container>
            <Input label="Nombre" onChange={(text) => setFirstname(text)} />
          </Container>
          <Spacer.Small />
          <Container>
            <Input label="Apellido" onChange={(text) => setLastname(text)} />
          </Container>
        </Container>

        <Container row>
          <Container>
            <Input
              style={{}}
              label="Fecha de nacimiento"
              onChange={(text) => setBirthday(text)}
            />
          </Container>
          <Spacer.Small />
          <Container>
            <Input
              style={{}}
              label="Email"
              onChange={(text) => setEmail(text)}
            />
          </Container>
        </Container>

        <Container>
          <Spacer.Medium />
          <Text.TitleH3>Puntaje FullEscabio: 44%</Text.TitleH3>
          <Text.TitleH3>Monto para siguiente nivel: $15000</Text.TitleH3>
        </Container>

        <Container>
          <Spacer.Large />
          <Button.Primary
            width={240}
            title="Guardar"
            onPress={() => {
              if (!firstname?.length) {
                alert("Por favor, ingrese el nombre");
                return;
              }
              if (!lastname?.length) {
                alert("Por favor, ingrese el apellido");
                return;
              }
              if (!email?.length) {
                alert("Por favor, ingrese el email");
                return;
              }
              const payload = {
                firstname,
                lastname,
                birthday,
                email,
              };
              submit(payload);
              onSubmit(payload);
            }}
          />
          <Spacer.Large />
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
