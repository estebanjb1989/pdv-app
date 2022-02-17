import React from "react";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button } from 'component'
import styles from "./styles";
import useStore from "services/store";

const Message = ({ text }) => {
  const closeModal = useStore(state => state.closeModal)
  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Spacer.Huge />
        <Text.BodyBold>{text}</Text.BodyBold>
        <Spacer.Large />
        <Button.Tertiary
          justifyCenter
          title="OK"
          onPress={() => {
            closeModal()
          }}
        />
        <Spacer.Huge />
      </Container>
    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string,
};

Message.defaultProps = {
  text: null,
};

export default Message;
