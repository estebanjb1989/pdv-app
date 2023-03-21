import React, { useState } from "react";
import { Picker } from "react-native";
import PropTypes from "prop-types";
import { Container, Spacer, Text, Button, Input } from "../../component";
import { useSelector } from "react-redux";
import roles from "../../constants/roles";
import styles from "./styles";
import tables from "./mock"
import colors from "../../constants/colors";

const WaiterTables = ({ onSubmit }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState("waiter");

  return (
    <Container padded style={styles.container}>
      <Container alignCenter>
        <Text.TitleH3>Mesas</Text.TitleH3>
        <Spacer.Medium />
        <Container row alignCenter wrap>
          {tables.map((table) => (
            <Container
              style={[
                styles.tableNameContainer,
                table.name === selectedTable?.name
                  ? {
                      backgroundColor: colors.tertiary,
                    }
                  : {},
              ]}
              flex
              alignCenter
              justifyCenter
              onPress={() => {
                setSelectedTable(table);
                onSubmit(table)
              }}
            >
              <Text.Body color={
                table.name === selectedTable?.name
                ? colors.dark2
                : null
              }>{table.name}</Text.Body>
              <Spacer.Medium />
              <Text.Body color={
                table.name === selectedTable?.name
                ? colors.dark2
                : null
              }>{table.total} ARS</Text.Body>
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

WaiterTables.propTypes = {
  text: PropTypes.string,
};

WaiterTables.defaultProps = {
  text: null,
};

export default WaiterTables;
