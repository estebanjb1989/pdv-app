import React from 'react';
import { Container, Button, Spacer } from '../../component'
import { useBackButton } from '../../hook'
import * as DocumentPicker from 'expo-document-picker'

const Adjustments = () => {
    useBackButton()

    return (
        <Container alignCenter>
            <Spacer.Medium />
            <Container style={{
                width: 240,
                height: 44
            }}>
                <Button.Primary
                    onPress={() => {
                        DocumentPicker.getDocumentAsync({
                            type: 'xls'
                        })
                    }}
                    title="Importar Productos"
                />
            </Container>
        </Container>
    );
}

export default Adjustments