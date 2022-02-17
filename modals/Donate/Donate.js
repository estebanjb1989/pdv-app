import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Dropdown, Spacer, Text, Button } from 'component'
import styles from "./styles";
import useStore from "services/store";
import { TextInput } from 'react-native';
import { getDatabase, ref as dbRef, set, } from 'firebase/database';
import fieldTypes from 'constants/fieldTypes'
import { camelize } from 'services/strings'
import moment from 'moment'

const Donate = ({ modelName, modelSlug }) => {
  const [readyToSubmit, setReadyToDonate] = useState(false)
  const [selectedFieldType, setSelectedFieldType] = useState(fieldTypes[0])
  const [fieldName, setFieldName] = useState(null)

  const closeModal = useStore(state => state.closeModal)

  useEffect(() => {
    setReadyToDonate(!!selectedFieldType &&
      !!fieldName?.length)
  }, [selectedFieldType, fieldName])

  const submit = async (onSuccess) => {
    try {
      const db = getDatabase();
      const reference = dbRef(db, 'models/:modelSlug/:fieldSlug'
        .replace(':modelSlug', modelSlug)
        .replace(':fieldSlug', camelize(fieldName)));
      set(reference, {
        modelName,
        modelSlug,
        fieldSlug: camelize(fieldName),
        fieldName,
        fieldTypeSlug: selectedFieldType?.value,
        fieldTypeName: selectedFieldType?.label,
        createdAt: moment().format('DD/MM/YYYY HH:mm'),
      });
      onSuccess()
    } catch (e) {
      console.log(e);
      alert(e.message);
    } finally {

    }
  }

  const handleFieldNameChange = (text) => {
    setFieldName(text)
  }

  return (
    <Container style={styles.container}>
      <Container alignCenter>
        <Text.TitleH2>Modelo: {modelSlug}</Text.TitleH2>
        <Text.TitleH3>Nuevo campo</Text.TitleH3>

        <Container>
          <Spacer.Medium />
          <Text.Body>Nombre del campo</Text.Body>
          <Spacer.Small />
          <TextInput
            style={styles.input}
            value={fieldName}
            defaultValue={fieldName}
            placeholder="Nombre del campo..."
            returnKeyType="done"
            onChangeText={handleFieldNameChange}
          />
          <Spacer.Small />
          <Text.Body>{camelize(fieldName || '-')}</Text.Body>
        </Container>

        <Spacer.Medium />
        <Dropdown
          data={fieldTypes.map(ft => {
            return {
              label: ft.name,
              value: ft.slug,
            }
          })}
          placeholder={'Selecciona el tipo de campo'}
          value={selectedFieldType}
          onChange={item => {
            setSelectedFieldType(item)
          }}
        />

        <Spacer.Medium />
        <Container>
          <Button.Primary
            width={240}
            justifyCenter
            disabled={!readyToSubmit}
            title={"CREAR CAMPO"}
            onPress={() => {
              submit(() => {
                closeModal()
              })
            }}
          />
          <Spacer.Large />
        </Container>
      </Container>
    </Container>
  );
};

Donate.propTypes = {
  text: PropTypes.string,
};

Donate.defaultProps = {
  text: null,
};

export default Donate;
