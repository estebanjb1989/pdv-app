import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet } from "react-native";
import { Text, Container, Spacer } from "../component";
import useHeaderRight from "./useHeaderRight";
import bsActions from "../redux/modules/bottomSheet";
import sessionActions from "../redux/modules/session";
import NoPictureAsset from "../assets/nopicture.png";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  selectedTableBadge: {
    width: 32,
    height: 32,
    borderRadius: 32,
    position: "absolute",
    top: 0,
    right: 0,
  },
});

const useWaiterTables = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleHeaderRight = useCallback(() => {
    const user = useSelector(({ session }) => session.credentials);
    console.log(user)
    return (
      <Container
        row
        alignCenter
        onPress={() => {
          dispatch(
            bsActions.open("User", {
              onSubmit: (values) => {
                dispatch(sessionActions.setCurrentTable(values));
                dispatch(bsActions.close());
              },
            })
          );
        }}
      >
        <Image
          source={NoPictureAsset}
          style={{
            width: 24,
            height: 24,
            borderRadius: 24,
          }}
        />
        <Spacer.Small />
        <Container
          alignCenter
          justifyCenter
        >
          <Text.Small>{user?.user?.email}</Text.Small>
        </Container>
      </Container>
    );
  }, [navigation])
  useHeaderRight(handleHeaderRight);
  return null;
};

export default useWaiterTables;
