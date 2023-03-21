import React, { useEffect, useState } from "react";
import { FlatList, Picker } from "react-native";
import { useDispatch } from "react-redux";
import { Button, Container, Text, Spacer, Loading } from "../../component";
import {
  useBackButton,
  useHeaderTitle,
  useHeaderRight,
  useUser,
} from "../../hook";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import bsActions from "../../redux/modules/bottomSheet";

const Staff = () => {
  const [selectedValues, setSelectedValues] = useState({});

  const { loadingUsers, users, submitMember, submitRoles, deleteUser } = useUser({
    refreshOnLoad: true,
  });

  const dispatch = useDispatch();
  useBackButton();
  useHeaderTitle("Staff");
  useHeaderRight(() => {
    return (
      <Container
        row
        alignCenter
        onPress={() => {
          dispatch(
            bsActions.open("AddMember", {
              onSubmit: (values) => {
                submitMember(values);
                dispatch(bsActions.close());
              },
            })
          );
        }}
      >
        <Text.Small>Nuevo ➕</Text.Small>
      </Container>
    );
  });

  const handleDelete = (item) => () => {
    deleteUser(item);
  };

  const handleSubmit = () => {
    console.log(selectedValues)
    submitRoles(selectedValues);
  };

  if (loadingUsers) {
    return <Loading />;
  }

  return (
    <Container flex>
      <Spacer.Medium />
      <Container alignCenter>
        <FlatList
          keyExtractor={(item) => item.name}
          data={users}
          renderItem={({ item }) => {
            return (
              <Container>
                <Container row spaceBetween alignCenter>
                  <Container
                    style={{
                      width: 160,
                    }}
                  >
                    <Text.Small>
                      {item.name || "[NOMBRE USUARIO]"}
                    </Text.Small>
                  </Container>
                  <Container
                    style={{
                      width: 160,
                    }}
                  >
                    <Picker
                      selectedValue={selectedValues?.[item.name] || item.role}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue) =>
                        setSelectedValues({
                          ...selectedValues,
                          [item.name]: itemValue,
                        })
                      }
                    >
                      <Picker.Item label="Mesero" value="waiter" />
                      <Picker.Item label="Cajero" value="teller" />
                      <Picker.Item label="Encargado" value="admin" />
                      <Picker.Item label="Reportes" value="reporter" />
                    </Picker>
                  </Container>
                  <Container>
                    <Container onPress={handleDelete(item)}>
                      <Text.Body>❌</Text.Body>
                    </Container>
                  </Container>
                </Container>
                <Spacer.Medium />
              </Container>
            );
          }}
        />
      </Container>
      <Container alignCenter>
        <Button.Primary
          width={240}
          title="Guardar"
          onPress={handleSubmit}
          disabled={Object.keys(selectedValues).length === 0}
        />
      </Container>
    </Container>
  );
};

export default Staff;
