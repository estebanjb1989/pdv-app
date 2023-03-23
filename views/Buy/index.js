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
  useClients,
  useBuy
} from "../../hook";

const Buy = () => {
  const { loading } = useBuy({
    refreshOnLoad: true,
  });
  const buy = [
    {
      id: 1,
      provider_id: 1,
    },
    {
      id: 2,
      provider_id: 2,
    },
  ];
  useDrawerToggler();

  if (loading) {
    return <Loading />;
  }

  return (
    <Container padded scrollEnabled>
      <DataTable
        keyField="id"
        dataSource={buy}
        columns={[
          {
            key: "id",
            title: "ID",
            width: "20%",
          },
          {
            key: "name",
            title: "Nombre",
            width: "40%",
          },
          {
            key: "document_type",
            title: "Tipo doc.",
            width: "20%",
          },
          {
            key: "document_number",
            title: "Nro. documento",
            width: "20%",
          },
          {
            key: "is_adlc",
            title: "Es ADLC?",
            width: "20%",
          },
        ]}
      />
    </Container>
  );
};

export default Buy;
