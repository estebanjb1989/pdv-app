import React, { useState } from "react";
import { Picker } from 'react-native'
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from '../../component'
import { useSelector } from 'react-redux'
import styles from "./styles";

const AddMember = ({
  onSubmit
}) => {
  const [name, setName] = useState(null)
  const [role, setRole] = useState('waiter')

  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Text.TitleH3>Alta de personal</Text.TitleH3>
        <Spacer.Medium />
        <Input
          label="Nombre"
          onChange={(text) => setName(text)}
        />
        <Spacer.Medium />
        <Picker
          selectedValue={role}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Mesero" value="waiter" />
          <Picker.Item label="Cajero" value="teller" />
          <Picker.Item label="Encargado" value="admin" />
          <Picker.Item label="Reportes" value="reporter" />
        </Picker>
        <Spacer.Medium />
        <Button.Primary
          title="OK"
          onPress={() => {
            if (!name?.length) {
              alert("Por favor, ingrese el nombre")
              return
            }
            if (!role?.length) {
              alert("Por favor, ingrese el rol de usuario")
              return
            }
            onSubmit({
              name,
              role
            })
          }}
        />
        <Spacer.Huge />
      </Container>
    </Container>
  );
};

AddMember.propTypes = {
  text: PropTypes.string,
};

AddMember.defaultProps = {
  text: null,
};

export default AddMember;
