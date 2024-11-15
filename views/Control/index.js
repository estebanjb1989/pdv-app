import React, { useEffect } from 'react';
import { TextInput, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Container, Text, Spacer, Loading } from '../../component'
import { useBackButton, useScanner, useHeaderTitle, useInventory } from '../../hook'
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import BarcodeAsset from '../../assets/barcode.png'

const Control = () => {
    const [barcodeScanned, setBarcodeScanned] = React.useState(null)
    const [inventoryItemScanned, setInventoryItemScanned] = React.useState(null)
    const [control, setControl] = React.useState(null)
    const workingDay = useSelector(state => state.workingDay.data)

    const {
        loadingInventory,
        inventory,
        refreshInventory,
    } = useInventory({
        refreshOnLoad: true,
    })

    useHeaderTitle("Stock")
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
            stock: control,
        });
        refreshInventory()
        setBarcodeScanned(null)
        setInventoryItemScanned(null)
        setControl(null)
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
                    <Text.TitleH3>Stock actual: {inventoryItemScanned.stock} </Text.TitleH3>
                    <Spacer.Medium />
                    <TextInput
                        placeholder="Nuevo stock"
                        autoFocus
                        defaultValue={inventoryItemScanned.stock}
                        onChangeText={(text) => setControl(parseFloat(text))}
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

export default Control
