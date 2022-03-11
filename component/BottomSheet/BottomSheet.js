import React, { useEffect } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import {
  useSelector,
  useDispatch,
} from 'react-redux'
import Modal from "react-native-modal";
import Container from "../Container";
import bsActions from '../../redux/modules/bottomSheet'
import Routes from "../../modals"
import styles from "./styles";

const BottomSheet = () => {
  const modalOpen = useSelector(state => state.bottomSheet.open)
  const modalProps = useSelector(state => state.bottomSheet.props)
  const modalRoute = useSelector(state => state.bottomSheet.route)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(bsActions.close())
  };

  useEffect(() => {
    if (modalOpen) {
      Keyboard.dismiss();
    }
  }, [modalOpen]);

  const ModalComponent = Routes.find((cmp) => cmp.route === modalRoute)
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
