import React from "react";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from "../../component";
import { useSelector } from "react-redux";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const User = ({ handleClose }) => {
  const navigation = useNavigation();
  const user = useSelector(({ session }) => session.credentials);

  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Text.TitleH3>{user?.user?.email}</Text.TitleH3>
        <Spacer.Medium />
        <Button.Tertiary
          onPress={() => {
            handleClose();
          }}
          title="Mis datos"
        ></Button.Tertiary>
        <Spacer.Medium />
        <Button.Tertiary
          onPress={() => {
            navigation.navigate("Onboarding/SignIn");
            handleClose();
          }}
          title="Salir"
        ></Button.Tertiary>
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
