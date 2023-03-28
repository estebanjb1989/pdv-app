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
  Button
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
  const { loading, clients } = useClients({
    refreshOnLoad: true,
  });
  useDrawerToggler();
  useBackButton();

  if (loading) {
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
      <DataTable
        keyField="id"
        dataSource={clients}
        columns={[
          {
            key: "firstname",
            title: "Nombre",
            width: "20%",
          },
          {
            key: "lastname",
            title: "Apellido",
            width: "20%",
          },
          {
            key: "birthday",
            title: "Fecha Nacimiento",
            width: "20%",
          },
          {
            key: "email",
            title: "Email",
            width: "40%",
          },
        ]}
      />
    </Container>
  );
};

export default Clients;
