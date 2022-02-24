import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, Image } from 'react-native'
import { Button, Container, Text, Spacer, Input } from '../../component'
import { useBackButton, useScanner, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'
import { getDatabase, ref as dbRef, push } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarcodeAsset from '../../assets/barcode.png'

const dialog = require('electron').remote.dialog

const PDV = () => {
    const [items, setItems] = useState([])
    const [scanned, setScanned] = useState(null)
    const inventory = useSelector(state => state.inventory.list)
    const [credentials, setCredentials] = useState(null)

    useHeaderTitle("PDV")
    useBackButton()
    useScanner(useCallback((barcode) => {
        const item = inventory.find(item => (
            item.barcode.toString() === barcode
        ))

        if (!item) {
            alert(barcode + ' no encontrado')
            return
        }

        if (!item.price) {
            alert(barcode + ' no tiene precio')
            return
        }

        if (!item.stock) {
            alert(barcode + ' no tiene stock')
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
        updateCart(scanned)
    }, [scanned])

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
        const response = await dialog.showMessageBoxSync(options)
        if (response === 0) {
            const db = getDatabase();
            const reference = dbRef(db, 'sales');
            push(reference, {
                credentials,
                items,
                total: calculateTotal(),
                soldOutAt: Date.now(),
            });
            setItems([])
        }
    }

    return (
        <Container flex spaceBetween>
            <Container row spaceBetween style={{
                paddingTop: 12,
            }}>
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
                                            {item.description}
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
                                        ❌
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
