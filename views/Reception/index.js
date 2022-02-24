import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, Image } from 'react-native'
import { Button, Container, Text, Spacer } from '../../component'
import { useBackButton, useScanner, useHeaderTitle } from '../../hook'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchInventory } from '../../services/firebase'
import BarcodeAsset from '../../assets/barcode.png'

const dialog = require('electron').remote.dialog

const Reception = () => {
    const [items, setItems] = useState([])
    const [scanned, setScanned] = useState(null)
    const inventory = useSelector(state => state.inventory.list)
    const [credentials, setCredentials] = useState(null)
    const dispatch = useDispatch()

    useHeaderTitle("Recepcion")
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

    useEffect(async () => {
        const creds = await AsyncStorage.getItem('@credentials')
        setCredentials(JSON.parse(creds))
    }, [])

    useEffect(() => {
        if (!scanned) {
            return
        }
        updateItems(scanned)
    }, [scanned])

    const updateItems = (scannedProduct) => {
        const existingItem = items.find(item => (
            item.productId === scannedProduct.productId
        ))

        if (existingItem) {
            setItems(items.map(item => (
                item.productId === scannedProduct.productId ?
                    { ...item, quantity: item.quantity + 1 } : item
            )))
        }
        else {
            setItems([
                ...items,
                {
                    id: items.length + 1,
                    quantity: 1,
                    ...scannedProduct,
                }
            ])
        }
    }

    const handleDelete = (item) => () => {
        if (item.quantity === 1) {
            setItems(items.filter(cartItem => (
                cartItem.productId !== item.productId
            )))
            return
        }

        setItems(
            items.map(cartItem => (
                cartItem.productId === item.productId ?
                    { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            ))
        )
    }

    const handleFinish = async () => {
        let options = {
            buttons: ["Si", "No"],
            message: "Confirma la Recepcion?"
        }
        const response = await dialog.showMessageBoxSync(options)
        if (response === 0) {
            const db = getDatabase();
            for (const item of items) {
                const reference = dbRef(db, 'inventory/' + item.barcode);
                await set(reference, {
                    barcode: item.barcode,
                    category: item.category,
                    stock: (item.stock || 0) + item.quantity,
                    description: item.description,
                    price: item.price || 0,
                    productId: item.productId,
                });
            }
            await fetchInventory()
            setItems([])
        }
    }

    return (
        <Container flex spaceBetween>
            <Container row spaceBetween padded>
                <Container fullWidth>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={items}
                        ListHeaderComponent={
                            <Container>
                                <Container row spaceBetween>
                                    <Container style={{
                                        width: '15%',
                                    }}>
                                        <Text.Small>CANT.</Text.Small>
                                    </Container>
                                    <Container style={{
                                        width: '35%',
                                    }}>
                                        <Text.Small>PRODUCTO</Text.Small>
                                    </Container>
                                    <Container style={{
                                        width: '10%',
                                    }}>

                                    </Container>
                                </Container>
                                <Container style={{
                                    height: 1,
                                    width: '100%',
                                    marginVertical: 12,
                                    backgroundColor: 'lightgrey',
                                }} />
                                {!items.length &&
                                    <Container flex alignCenter justifyCenter>
                                        <Spacer.Medium />
                                        <Image source={BarcodeAsset} style={{
                                            width: 128,
                                            height: 128,
                                            opacity: 0.5
                                        }} />
                                    </Container>}
                            </Container>
                        }
                        renderItem={({ item }) => (
                            <Container row spaceBetween>
                                <Container style={{
                                    width: '15%',
                                }} alignCenter>
                                    <Text.Body>{item.quantity}</Text.Body>
                                </Container>
                                <Container style={{
                                    width: '35%',
                                }}>
                                    <Text.Body>
                                        {item.description}
                                    </Text.Body>
                                </Container>
                                <Container style={{
                                    width: '10%',
                                }}
                                    onPress={handleDelete(item)}
                                >
                                    <Text.Body>❌</Text.Body>
                                </Container>
                            </Container>
                        )}
                    />
                </Container>
            </Container>
            <Container>
                <Container alignCenter>
                    <Button.Primary
                        disabled={items.length === 0}
                        title="FINALIZAR RECEPCION"
                        width={256}
                        onPress={handleFinish}
                    />
                </Container>
                <Spacer.Medium />
            </Container>
        </Container>
    );
}

export default Reception
