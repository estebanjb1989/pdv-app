import React, { useState } from "react";
import { Picker } from "react-native";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from "../../component";
import { useSelector } from "react-redux";
import roles from "../../constants/roles";
import styles from "./styles";
import tables from "./mock"
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const User = ({ handleClose }) => {
  
  const navigation = useNavigation()
  const [selectedTable, setSelectedTable] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState("waiter");
  const user = useSelector(({ session }) => session.credentials);

  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Text.TitleH3>{user?.user?.email}</Text.TitleH3>
        <Spacer.Medium />
        <Button.Tertiary onPress={() => {
          navigation.navigate("SignIn")
          handleClose()
        }} title="Salir"></Button.Tertiary>
      </Container>
    </Container>
  );
};

User.propTypes = {
  text: PropTypes.string,
};

User.defaultProps = {
  text: null,
};

export default User;
