import React, { useEffect } from "react";
import { FlatList } from "react-native";
import {
  Container,
  Text,
  Spacer,
  Divider,
  DataTable,
  Loading,
  Input,
} from "../../component";
import {
  useBackButton,
  useHeaderTitle,
  useIsMobile,
  useInventory,
  useDrawerToggler,
} from "../../hook";

const Inventory = () => {

  const { loadingInventory, inventory } = useInventory({
    refreshOnLoad: true,
  });
  useDrawerToggler()

  if (loadingInventory) {
    return <Loading />;
  }

  return (
    <Container padded scrollEnabled>
      {/* <Container row wrap spaceBetween>
        <Container>
          <Input label="Categoria" />
          <Spacer.Medium />
        </Container>
        <Spacer.Small />
        <Container>
          <Input label="Cod. Barra" />
          <Spacer.Medium />
        </Container>
        <Spacer.Small />
        <Container>
          <Input label="Descripcion" />
          <Spacer.Medium />
        </Container>
      </Container>
      <Container row wrap spaceBetween>
        <Container>
          <Input label="Precio" />
          <Spacer.Medium />
        </Container>
        <Spacer.Small />
        <Container>
          <Input label="Stock" />
          <Spacer.Medium />
        </Container>
        <Spacer.Small />
        <Container>
          <Input label="Unidad de medida" />
          <Spacer.Medium />
        </Container>
      </Container> */}
      <DataTable
        keyField="barcode"
        dataSource={inventory}
        columns={[
          {
            key: "category",
            title: "Categoria",
            width: "20%",
          },
          {
            key: "barcode",
            title: "Cod. Barra",
            width: "20%",
          },
          {
            key: "description",
            title: "Descripcion",
            width: "20%",
          },
          {
            key: "price",
            title: "Precio (ARS)",
            width: "20%",
            alignEnd: true,
          },
          {
            key: "stock",
            title: "Stock",
            width: "20%",
            alignEnd: true,
          },
        ]}
      />
    </Container>
  );
};

export default Inventory;
