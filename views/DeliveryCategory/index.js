import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useInventory,
  useBackButton,
  useHeaderTitle,
  useIsMobile,
} from "../../hook";
import { Container, Text, Loading, Spacer } from "../../component";
import styles from "./styles";
import useWaiterTables from "../../hook/useWaiterTables";

const DeliveryCategory = () => {
  const navigation = useNavigation();

  useBackButton();
  // useWaiterTables();
  useHeaderTitle("Carta");
  const isMobile = useIsMobile();

  const { loadingInventory, inventory, refreshInventory } = useInventory({
    refreshOnLoad: true,
  });

  const categories = useMemo(() => {
    return inventory
      .map((item) => item.category)
      .filter((item, index, self) => self.indexOf(item) === index);
  }, [inventory]);

  if (loadingInventory) {
    return <Loading />;
  }

  return (
    <Container alignCenter>
      <Spacer.Medium />
      <FlatList
        horizontal={!isMobile}
        keyExtractor={(item) => item}
        data={categories}
        renderItem={({ item }) => (
          <Container
            style={isMobile ? styles.menuItemMobile : styles.menuItem}
            onPress={() => {
              navigation.navigate("DeliveryProduct", {
                category: item,
              });
            }}
          >
            <Text.Small>{item}</Text.Small>
          </Container>
        )}
      />
    </Container>
  );
};

export default DeliveryCategory;
