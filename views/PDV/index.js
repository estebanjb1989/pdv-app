import React, { useState, useEffect } from 'react';
import { FlatList, Image } from 'react-native'
import { Button, Container, Text, Spacer, Loading } from '../../component'
import { useBackButton, useScanner, useHeaderTitle, useInventory } from '../../hook'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, push, set } from 'firebase/database';
import styles from './styles'
import BarcodeAsset from '../../assets/barcode.png'

const dialog = require('electron').remote.dialog

const PDV = () => {
    const [items, setItems] = useState([])
    const [barcodeScanned, setBarcodeScanned] = useState(null)
    const [inventoryItemScanned, setInventoryItemScanned] = useState(null)
    const [credentials, setCredentials] = useState(null)

    useEffect(async () => {
        const creds = await AsyncStorage.getItem('@credentials')
        setCredentials(JSON.parse(creds))
    }, [])

    const {
        loadingInventory,
        refreshInventory,
        inventory,
    } = useInventory({
        refreshOnLoad: true,
    })

    useHeaderTitle("PDV")
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

        if (!item.price) {
            alert(barcodeScanned + ' no tiene precio')
            return
        }

        if (!item.stock) {
            alert(barcodeScanned + ' no tiene stock')
            return
        }

        setInventoryItemScanned({
            ...item,
            scannedAt: Date.now(),
        })
    }, [barcodeScanned, inventory])

    useEffect(() => {
        if (!inventoryItemScanned) {
            return
        }
        updateCart(inventoryItemScanned)
    }, [inventoryItemScanned])

    const updateCart = (scannedProduct) => {
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

    const calculateTotal = () => {
        return items.reduce((carry, value) => {
            return carry + (value.price * value.quantity)
        }, 0)
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
            message: "Confirma la venta?"
        }
        const response = dialog.showMessageBoxSync(options)
        if (response === 0) { // si dice que si
            const db = getDatabase();
            let reference = ref(db, 'sales');
            await push(reference, {
                credentials,
                items,
                total: calculateTotal(),
                soldOutAt: Date.now(),
            });

            // WIP
            for (const item of items) {
                reference = ref(db, 'inventory/' + item.barcode);
                const qty = item.quantity
                delete item.quantity
                await set(reference, {
                    ...item,
                    stock: item.stock - qty
                });
            }
            refreshInventory()
            // steps to update stock
            // fetch inventory by id

            // set inventory by id
            // fetch inventory by id and dispatch
            setItems([])
        }
    }

    if (loadingInventory) {
        return <Loading />
    }

    return (
        <Container flex spaceBetween>
            <Container row spaceBetween style={styles.container}>
                <Container fullWidth>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={items}
                        ListHeaderComponent={
                            <Container>
                                <Container row spaceBetween>
                                    <Container style={{
                                        width: '10%',
                                    }}>

                                    </Container>
                                    <Container style={{
                                        width: '40%',
                                    }}>

                                    </Container>
                                    <Container style={{
                                        width: '20%',
                                    }}>
                                        <Text.Small>P/U</Text.Small>
                                    </Container>
                                    <Container style={{
                                        width: '20%'
                                    }}>
                                        <Text.Small>IMPORTE</Text.Small>
                                    </Container>
                                    <Container style={{
                                        width: '10%'
                                    }} />
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
                            <Container>
                                <Container row spaceBetween alignCenter>
                                    <Container style={{
                                        width: '10%',
                                    }} alignCenter>
                                        <Text.BodyBold>{item.quantity}</Text.BodyBold>
                                    </Container>
                                    <Container style={{
                                        width: '40%',
                                        paddingHorizontal: 2,
                                    }}>
                                        <Text.Body>
                                            {item.description} (stock {item.stock || 0})
                                        </Text.Body>
                                    </Container>
                                    <Container style={{
                                        width: '20%',
                                        paddingHorizontal: 2,

                                    }}>
                                        <Container row alignCenter>
                                            <Text.Body>
                                                {item.price} ARS
                                            </Text.Body>
                                        </Container>
                                    </Container>
                                    <Container style={{
                                        width: '20%',
                                        paddingHorizontal: 2,
                                    }}>
                                        <Container row alignCenter>
                                            <Text.BodyBold>
                                                {item.price * item.quantity} ARS
                                        </Text.BodyBold>

                                        </Container>
                                    </Container>
                                    <Container style={{
                                        width: '10%',
                                    }}
                                        onPress={handleDelete(item)}
                                    >
                                        <Text.Body>❌</Text.Body>
                                    </Container>
                                </Container>
                                <Container style={{
                                    height: 1,
                                    width: '100%',
                                    marginVertical: 12,
                                    backgroundColor: 'lightgrey',
                                    opacity: 0.25
                                }} />

                            </Container>
                        )}
                    />
                </Container>
            </Container>
            <Container>
                <Container alignEnd padded>
                    <Container style={{
                        height: 1,
                        width: '100%',
                        marginVertical: 12,
                        backgroundColor: 'lightgrey',
                        opacity: 0.25
                    }} />
                    <Text.Small>TOTAL</Text.Small>
                    <Text.BodyBold fontSize={24}>{calculateTotal()} ARS</Text.BodyBold>
                </Container>
                <Container alignCenter>
                    <Button.Primary
                        disabled={items.length === 0}
                        title="COBRAR PEDIDO"
                        width={196}
                        onPress={handleFinish}
                    />
                    <Spacer.Medium />
                </Container>
            </Container>
        </Container>
    );
}

export default PDV
