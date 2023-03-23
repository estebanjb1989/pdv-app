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
} from "../../hook";

const Clients = () => {
  const { loading } = useClients({
    refreshOnLoad: true,
  });
  const clients = [
    {
      id: 1,
      name: "Juan Perez",
      document_type: "dni",
      document_number: "11222333",
      is_adlc: 'NO',
    },
    {
      id: 2,
      name: "Victor Robles",
      document_type: "passport",
      document_number: "222333",
      is_adlc: 'SI',
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
        dataSource={clients}
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

export default Clients;
