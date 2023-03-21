import React, { useMemo } from "react";
import { FlatList, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  useInventory,
  useBackButton,
  useHeaderTitle,
  useIsMobile,
} from "../../hook";
import { Container, Text, Loading, Spacer } from "../../component";
import bsActions from "../../redux/modules/bottomSheet";
import styles from "./styles";
import { CartTypes } from "../../redux/types";
import useWaiterTables from "../../hook/useWaiterTables";

const DeliveryProduct = () => {
  const route = useRoute();
  const selectedCategory = route.params?.category;
  const cart = useSelector((state) => state.cart.list);
  const isMobile = useIsMobile();

  const dispatch = useDispatch();
  useBackButton();
  useWaiterTables();
  useHeaderTitle("Categoria: " + selectedCategory);

  const { loadingInventory, inventory } = useInventory({
    refreshOnLoad: true,
  });

  const products = useMemo(() => {
    return inventory.filter((item) => item.category === selectedCategory);
  }, [inventory]);

  if (loadingInventory) {
    return <Loading />;
  }

  return (
    <Container>
      <Spacer.Medium />
      <FlatList
        keyExtractor={(item) => item.description}
        contentContainerStyle={styles.container}
        data={products}
        renderItem={({ item }) => (
          <Container
            style={isMobile ? styles.menuItemMobile : styles.menuItem}
            onPress={() => {
              dispatch({
                type: CartTypes.SET_CART,
                payload: [...cart, { ...item, quantity: 1, }],
              });
              dispatch(bsActions.open("Cart"));
            }}
          >
            <Container flex spaceBetween alignCenter>
              <Spacer.Small />
              <Text.Small>{item.description}</Text.Small>
              {/*<Image
                source={{
                  uri: "https://via.placeholder.com/80",
                }}
                style={{
                  width: 80,
                  height: 80,
                }}
            />*/}
              <Text.Small>{item.price || 0} ARS</Text.Small>
              <Spacer.Small />
            </Container>
          </Container>
        )}
      />
    </Container>
  );
};

export default DeliveryProduct;
