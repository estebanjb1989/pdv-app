import React, { useEffect } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import Container from "../Container";
import Modal from "react-native-modal";
import Routes from "../../modals"
import styles from "./styles";
import useStore from "services/store";

const BottomSheet = () => {
  const [modalOpen, modalProps, closeModal] = useStore(state => [state.modalOpen, state.modalProps, state.closeModal])

  const handleClose = () => {
    closeModal()
  };

  useEffect(() => {
    if (modalOpen) {
      Keyboard.dismiss();
    }
  }, [modalOpen]);

  const ModalComponent = Routes.find((cmp) => cmp.route === modalOpen)
    ?.component;
  const behavior = Platform.OS === "ios" ? "padding" : "height";
  const keyboardVerticalOffset = Platform.OS === "ios" ? undefined : 100;

  return (
    <Modal
      isVisible={!!modalOpen}
      swipeDirection="down"
      onSwipeComplete={handleClose}
      propagateSwipe={true}
      animationInTiming={400}
      animationOutTiming={400}
      style={styles.modal}
    >
      <View style={styles.wrap}>
        {ModalComponent && (
          <KeyboardAvoidingView
            behavior={behavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={styles.content}
          >
            <Container roundBorders>
              <Container style={styles.head} alignCenter justifyCenter>
                <View style={styles.swipeIndicator} />
              </Container>
              <ModalComponent {...modalProps} />
            </Container>
          </KeyboardAvoidingView>
        )}
      </View>
    </Modal>
  );
};

export default BottomSheet;
