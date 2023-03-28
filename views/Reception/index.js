import React, { useState, useEffect } from "react";
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
import { getDatabase, ref as dbRef, set } from "firebase/database";
import BarcodeAsset from "../../assets/barcode.png";

const dialog = null; //require('electron').remote.dialog

const Reception = () => {
  const [items, setItems] = useState([]);
  const [barcodeScanned, setBarcodeScanned] = useState(null);
  const [inventoryItemScanned, setInventoryItemScanned] = useState(null);

  const { loadingInventory, inventory, refreshInventory } = useInventory({
    refreshOnLoad: true,
  });

  useBackButton();
  useScanner((barcode) => {
    setBarcodeScanned(barcode);
  });
  useUserHeader();
  useDrawerToggler();

  useEffect(() => {
    if (!barcodeScanned || !inventory?.length) {
      return;
    }

    const item = inventory.find(
      (item) => item.barcode.toString() === barcodeScanned
    );

    if (!item) {
      alert(barcodeScanned + " no encontrado");
      return;
    }

    setInventoryItemScanned({
      ...item,
      scannedAt: Date.now(),
    });
    setBarcodeScanned(null);
  }, [barcodeScanned, inventory]);

  useEffect(() => {
    if (!inventoryItemScanned) {
      return;
    }
    updateItems(inventoryItemScanned);
  }, [inventoryItemScanned]);

  const updateItems = (scannedProduct) => {
    const existingItem = items.find(
      (item) => item.productId === scannedProduct.productId
    );

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.productId === scannedProduct.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          id: items.length + 1,
          quantity: 1,
          ...scannedProduct,
        },
      ]);
    }
  };

  const handleDelete = (item) => () => {
    if (item.quantity === 1) {
      setItems(
        items.filter((cartItem) => cartItem.productId !== item.productId)
      );
      return;
    }

    setItems(
      items.map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const handleFinish = async () => {
    let options = {
      buttons: ["Si", "No"],
      message: "Confirma la Recepcion?",
    };
    const response = await dialog?.showMessageBoxSync?.(options);
    if (response === 0) {
      const db = getDatabase();
      for (const item of items) {
        const reference = dbRef(db, "inventory/" + item.barcode);
        await set(reference, {
          barcode: item.barcode,
          category: item.category,
          stock: (item.stock || 0) + item.quantity,
          description: item.description,
          price: item.price || 0,
          productId: item.productId,
        });
      }

      refreshInventory();
      setInventoryItemScanned(null);
      setItems([]);
    }
  };

  if (loadingInventory) {
    return <Loading />;
  }

  return (
    <Container flex spaceBetween>
      <Container
        row
        spaceBetween
        style={{
          paddingTop: 12,
        }}
      >
        <Container fullWidth>
          <FlatList
            keyExtractor={(item) => item.id}
            data={items}
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
                      width: "30%",
                    }}
                  >
                    <Text.Small>CANT.</Text.Small>
                  </Container>
                  <Container
                    style={{
                      width: "50%",
                    }}
                  >
                    <Text.Small>PRODUCTO</Text.Small>
                  </Container>
                  <Container
                    style={{
                      width: "10%",
                    }}
                  ></Container>
                </Container>
                <Container
                  style={{
                    height: 1,
                    width: "100%",
                    marginVertical: 12,
                    backgroundColor: "lightgrey",
                  }}
                />
                {!items.length && (
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
              <Container row spaceBetween>
                <Container
                  style={{
                    width: "10%",
                  }}
                ></Container>
                <Container
                  style={{
                    width: "30%",
                  }}
                  alignCenter
                >
                  <Text.Body>{item.quantity}</Text.Body>
                </Container>
                <Container
                  style={{
                    width: "50%",
                  }}
                >
                  <Text.Body>{item.description}</Text.Body>
                </Container>
                <Container
                  style={{
                    width: "10%",
                  }}
                  onPress={handleDelete(item)}
                >
                  <Text.Body>❌</Text.Body>
                </Container>
              </Container>
            )}
          />
        </Container>
      </Container>
      <Container>
        <Container alignCenter>
          <Button.Primary
            disabled={items.length === 0}
            title="FINALIZAR RECEPCION"
            width={256}
            onPress={handleFinish}
          />
        </Container>
        <Spacer.Medium />
      </Container>
    </Container>
  );
};

export default Reception;
