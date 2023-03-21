import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet } from "react-native";
import { Text, Container } from "../component";
import useHeaderRight from "./useHeaderRight";
import bsActions from "../redux/modules/bottomSheet";
import sessionActions from "../redux/modules/session";
import MesaAsset from "../assets/mesa.png";
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
    const currentTable = useSelector(({ session }) => session.table);
    return (
      <Container
        row
        alignCenter
        onPress={() => {
          navigation.navigate("DeliveryCategory");
          dispatch(
            bsActions.open("WaiterTables", {
              onSubmit: (values) => {
                dispatch(sessionActions.setCurrentTable(values));
                dispatch(bsActions.close());
              },
            })
          );
        }}
      >
        <Image
          source={MesaAsset}
          style={{
            width: 56,
            height: 56,
            marginRight: 32,
          }}
        />
        <Container style={styles.selectedTableBadge} alignCenter justifyCenter>
          <Text.Small>{currentTable?.name || "?"}</Text.Small>
        </Container>
        <Container
          style={{
            height: 32,
            borderRadius: 32,
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 0,
          }}
          alignCenter
          justifyCenter
        >
          <Text.Body>{currentTable?.total || '?'} ARS</Text.Body>
        </Container>
      </Container>
    );
  }, [navigation])
  useHeaderRight(handleHeaderRight);
  return null;
};

export default useWaiterTables;
