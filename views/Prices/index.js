import React, { useCallback } from 'react';
import { TextInput } from 'react-native'
import { Container, Text, Spacer } from '../../component'
import { useBackButton, useScanner, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'
import { getDatabase, ref as dbRef, set } from 'firebase/database';

const Prices = () => {
    const [scanned, setScanned] = React.useState(null)
    const [price, setPrice] = React.useState(null)
    const inventory = useSelector(state => state.inventory.list)

    useHeaderTitle("Precios")
    useBackButton()
    useScanner(useCallback((barcode) => {
        const item = inventory.find(item => (
            item.barcode.toString() === barcode
        ))

        if (!item) {
            alert(barcode + ' no encontrado')
            return
        }

        setScanned({
            ...item,
            scannedAt: Date.now(),
        })
    }, [setScanned]))

    const handleUpdate = () => {
        const db = getDatabase();
        const reference = dbRef(db, 'inventory/' + scanned.barcode);
        set(reference, {
            ...scanned,
            price,
        });
        setScanned(null)
        setPrice(null)
    }

    const item = inventory.find(item => (
        item.barcode.toString() === scanned?.barcode.toString()
    ))

    return (
        <Container flex alignCenter justifyCenter>
            <Text.TitleH1>{item?.description || 'Escanee un producto'}</Text.TitleH1>
            {item && (
                <Container alignCenter>
                    <Text.TitleH1>Precio actual: {item.price} ARS</Text.TitleH1>
                    <Spacer.Medium />
                    <TextInput
                        placeholder="Nuevo precio ARS"
                        autoFocus
                        onChangeText={(text) => setPrice(parseFloat(text))}
                        onSubmitEditing={handleUpdate}
                        style={{
                            width: 240,
                            height: 50,
                            paddingHorizontal: 12,
                            backgroundColor: 'whitesmoke',
                        }}
                    />
                </Container>
            )}
        </Container>
    );
}

export default Prices
