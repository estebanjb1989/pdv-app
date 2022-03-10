import React, { useEffect } from 'react';
import { TextInput, Image } from 'react-native'
import { Container, Text, Spacer, Loading } from '../../component'
import { useBackButton, useScanner, useHeaderTitle, useInventory } from '../../hook'
import { useDispatch } from 'react-redux'
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import BarcodeAsset from '../../assets/barcode.png'

const Prices = () => {
    const [barcodeScanned, setBarcodeScanned] = React.useState(null)
    const [inventoryItemScanned, setInventoryItemScanned] = React.useState(null)
    const [price, setPrice] = React.useState(null)

    const {
        loadingInventory,
        inventory,
        refreshInventory,
    } = useInventory({
        refreshOnLoad: true,
    })

    useHeaderTitle("Precios")
    useBackButton()
    useScanner((barcode) => {
        setBarcodeScanned(barcode)
    })

    useEffect(() => {
        if (!barcodeScanned || !inventory?.length) {
            return
        }

        const item = inventory.find(item => (
            item.barcode.toString() === barcodeScanned
        ))

        if (!item) {
            alert(barcodeScanned + ' no encontrado')
            return
        }

        setInventoryItemScanned({
            ...item,
            scannedAt: Date.now(),
        })
    }, [barcodeScanned, inventory])

    const handleUpdate = async () => {
        const db = getDatabase();
        const reference = dbRef(db, 'inventory/' + inventoryItemScanned.barcode);
        await set(reference, {
            ...inventoryItemScanned,
            price,
        });
        refreshInventory()
        setBarcodeScanned(null)
        setInventoryItemScanned(null)
        setPrice(null)
    }

    if (loadingInventory) {
        return (
            <Loading />
        )
    }

    return (
        <Container flex alignCenter justifyCenter>
            {!inventoryItemScanned && <Container flex alignCenter justifyCenter>
                <Image source={BarcodeAsset} style={{
                    width: 128,
                    height: 128,
                    opacity: 0.5
                }} />
            </Container>}
            {inventoryItemScanned && (
                <Container alignCenter>
                    <Text.TitleH3>{inventoryItemScanned.description}</Text.TitleH3>
                    <Spacer.Small />
                    <Text.TitleH3>Precio actual: {inventoryItemScanned.price} ARS</Text.TitleH3>
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
