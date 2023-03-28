import React, { useState, useEffect, useCallback } from "react";
import { FlatList, Image } from "react-native";
import { Button, Container, Text, Spacer, Loading } from "../../component";
import {
  useBackButton,
  useScanner,
  useHeaderTitle,
  useInventory,
  useUserHeader,
  useDrawerToggler,
} from "../../hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  updateCart,
  handleDelete,
  handleFinish,
  calculateTotal,
  validateBarcode,
} from "../../business/pdv";
import styles from "./styles";
import BarcodeAsset from "../../assets/barcode.png";
import { useDispatch, useSelector } from "react-redux";
import bsActions from "../../redux/modules/bottomSheet";
import { CartTypes } from "../../redux/types";

const PDV = () => {
  const [barcodeScanned, setBarcodeScanned] = useState(null);
  const [inventoryItemScanned, setInventoryItemScanned] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.list);

  useEffect(async () => {
    const creds = await AsyncStorage.getItem("@credentials");
    setCredentials(JSON.parse(creds));
  }, []);

  const { loadingInventory, refreshInventory, inventory } = useInventory({
    refreshOnLoad: true,
  });

  useScanner((barcode) => {
    setBarcodeScanned(barcode);
  });
  useDrawerToggler();

  useEffect(() => {
    if (!barcodeScanned || !inventory?.length) {
      return;
    }

    const item = validateBarcode(barcodeScanned, inventory);
    if (!item) {
      return;
    }

    setBarcodeScanned(null);
    setInventoryItemScanned({
      ...item,
      scannedAt: Date.now(),
    });
  }, [barcodeScanned, inventory]);

  useEffect(() => {
    if (!inventoryItemScanned) {
      return;
    }
    updateCart(inventoryItemScanned, cart, inventory, dispatch);
  }, [inventoryItemScanned, cart, inventory, dispatch]);

  const handleLookupPress = useCallback(() => {
    dispatch(
      bsActions.open("ProductLookup", {
        onSubmit: (product, currentCart) => {
          updateCart(product, currentCart, inventory, dispatch);
        },
      })
    );
  }, [cart, inventory, dispatch]);

  if (loadingInventory) {
    return <Loading />;
  }

  return (
    <Container flex spaceBetween>
      <Container row spaceBetween style={styles.container}>
        <Container fullWidth>
          <FlatList
            keyExtractor={(item) => item.id}
            data={cart}
            ListHeaderComponent={
              <Container>
                <Container row spaceBetween>
                  <Container
                    style={{
                      width: "10%",
                    }}
                  ></Container>
                  <Container
                    style={{
                      width: "40%",
                    }}
                  ><Text.Small>PRODUCTO</Text.Small></Container>
                  <Container
                    style={{
                      width: "20%",
                    }}
                  >
                    <Text.Small>Precio</Text.Small>
                  </Container>
                  <Container
                    style={{
                      width: "20%",
                    }}
                  >
                    <Text.Small>IMPORTE</Text.Small>
                  </Container>
                  <Container
                    style={{
                      width: "10%",
                    }}
                  />
                </Container>
                <Container
                  style={{
                    height: 1,
                    width: "100%",
                    marginVertical: 12,
                    backgroundColor: "lightgrey",
                  }}
                />
                {!cart.length && (
                  <Container flex alignCenter justifyCenter>
                    <Spacer.Medium />
                    <Image
                      source={BarcodeAsset}
                      style={{
                        width: 128,
                        height: 128,
                        opacity: 0.5,
                      }}
                    />
                  </Container>
                )}
              </Container>
            }
            renderItem={({ item }) => (
              <Container>
                <Container row spaceBetween alignCenter>
                  <Container
                    style={{
                      width: "10%",
                    }}
                    alignCenter
                  >
                    <Text.BodyBold>{item.quantity}</Text.BodyBold>
                  </Container>
                  <Container
                    style={{
                      width: "40%",
                      paddingHorizontal: 2,
                    }}
                  >
                    <Text.Body>
                      {item.description}
                    </Text.Body>
                  </Container>
                  <Container
                    style={{
                      width: "20%",
                      paddingHorizontal: 2,
                    }}
                  >
                    <Container row alignCenter>
                      <Text.Body>{item.price} ARS</Text.Body>
                    </Container>
                  </Container>
                  <Container
                    style={{
                      width: "20%",
                      paddingHorizontal: 2,
                    }}
                  >
                    <Container row alignCenter>
                      <Text.BodyBold>
                        {item.price * item.quantity} ARS
                      </Text.BodyBold>
                    </Container>
                  </Container>
                  <Container
                    style={{
                      width: "10%",
                    }}
                    onPress={handleDelete(cart, item, dispatch)}
                  >
                    <Text.Body>❌</Text.Body>
                  </Container>
                </Container>
                <Container
                  style={{
                    height: 1,
                    width: "100%",
                    marginVertical: 12,
                    backgroundColor: "lightgrey",
                    opacity: 0.25,
                  }}
                />
              </Container>
            )}
          />
        </Container>
      </Container>
      <Container>
        <Container
          style={{
            height: 1,
            width: "100%",
            marginVertical: 12,
            backgroundColor: "lightgrey",
            opacity: 0.25,
          }}
        />
        <Container row fullWidth spaceBetween>
          <Container
            style={{
              marginLeft: 12,
            }}
          >
            <Container row alignCenter>
              <Button.Primary
                disabled={cart.length === 0}
                title="Cobrar"
                width={80}
                onPress={() =>
                  handleFinish(credentials, cart, dispatch, refreshInventory)
                }
              />
              <Container style={{ marginLeft: 12 }}>
                <Button.Primary
                  width={80}
                  title="Buscar"
                  onPress={handleLookupPress}
                />
              </Container>
            </Container>
            <Spacer.Medium />
          </Container>
          <Container
            alignEnd
            style={{
              marginRight: 12,
            }}
          >
            <Text.Small>TOTAL</Text.Small>
            <Text.BodyBold fontSize={24}>
              {calculateTotal(cart)} ARS
            </Text.BodyBold>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default PDV;
