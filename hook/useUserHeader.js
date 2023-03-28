import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet } from "react-native";
import { Text, Container, Spacer } from "../component";
import useHeaderRight from "./useHeaderRight";
import bsActions from "../redux/modules/bottomSheet";
import NoPictureAsset from "../assets/nopicture.png";
import { useNavigation } from "@react-navigation/native";

export const AvatarComponent = () => {
  const dispatch = useDispatch();
  return (
    <Container
      row
      alignCenter
      onPress={() => {
        dispatch(
          bsActions.open("User", {
            onSubmit: () => {
              dispatch(bsActions.close());
            },
          })
        );
      }}
    >
      <Image
        source={NoPictureAsset}
        style={{
          width: 32,
          height: 32,
          borderRadius: 32,
        }}
      />
      <Spacer.Medium />
    </Container>
  );
};

const useUserHeader = () => {
  const navigation = useNavigation();
  const handleHeaderRight = useCallback(() => {
    return <AvatarComponent />;
  }, [navigation]);
  useHeaderRight(handleHeaderRight);
  return null;
};

export default useUserHeader;
