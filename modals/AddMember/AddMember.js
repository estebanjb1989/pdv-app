import React, { useState } from "react";
import { Picker } from 'react-native'
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from '../../component'
import { useSelector } from 'react-redux'
import styles from "./styles";

const AddMember = ({
  onSubmit
}) => {
  const [email, setEmail] = useState(null)
  const [role, setRole] = useState(null)

  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Text.TitleH3>Nuevo miembro</Text.TitleH3>
        <Spacer.Medium />
        <Input
          label="Email"
          onChange={(text) => setEmail(text)}
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
        </Picker>
        <Spacer.Medium />
        <Button.Primary
          title="OK"
          onPress={() => {
            onSubmit({
              email,
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
