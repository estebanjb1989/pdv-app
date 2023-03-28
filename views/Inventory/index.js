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
  Button,
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
  useDrawerToggler();
  useBackButton();

  if (loadingInventory) {
    return <Loading />;
  }

  return (
    <Container scrollEnabled>
      <Container alignCenter>
        <Spacer.Medium />
        <Container row>
          <Spacer.Small />
          <Button.Primary width={240} title="Exportar Excel" />
        </Container>
        <Spacer.Medium />
      </Container>
      <Container alignCenter>
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
    </Container>
  );
};

export default Inventory;

{
  /* <Container row wrap spaceBetween>
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
      </Container> */
}
