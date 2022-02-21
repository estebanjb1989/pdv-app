import React, { useCallback, useState, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Button, Container, Text, Spacer } from '../../component'
import { useBackButton, useScanner, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'
import { getDatabase, ref as dbRef, push } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dialog = require('electron').remote.dialog 

const PDV = () => {
    const [items, setItems] = useState([])
    const [scanned, setScanned] = useState(null)
    const inventory = useSelector(state => state.inventory.list)
    const [credentials, setCredentials] = useState(null)

    useHeaderTitle("Punto de venta")
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
                                        <Text.Small>CANTIDAD</Text.Small>
                                    </Container>
                                    <Container style={{
                                        width: '45%',
                                    }}>
                                        <Text.Small>PRODUCTO</Text.Small>
                                    </Container>
                                    <Container style={{
                                        width: '20%',
                                    }}>
                                        <Text.Small>PRECIO</Text.Small>
                                    </Container>
                                    <Container style={{
                                        width: '20%'
                                    }}>
                                        <Text.Small>SUBTOTAL</Text.Small>
                                    </Container>
                                </Container>
                                <Container style={{
                                    height: 1,
                                    width: '100%',
                                    marginVertical: 12,
                                    backgroundColor: 'gold',
                                }} />
                                {!items.length &&
                                    <Container>
                                        <Spacer.Medium />
                                        <Text.BodyBold>Comience a escanear...</Text.BodyBold>
                                    </Container>}
                            </Container>
                        }
                        renderItem={({ item }) => (
                            <Container row spaceBetween>
                                <Container style={{
                                    width: '15%',
                                }} alignCenter>
                                    <Text.TitleH2>{item.quantity}</Text.TitleH2>
                                </Container>
                                <Container style={{
                                    width: '45%',
                                }}>
                                    <Text.TitleH2>
                                        {item.description}
                                    </Text.TitleH2>
                                </Container>
                                <Container style={{
                                    width: '20%'
                                }}>
                                    <Container row alignCenter>
                                        <Text.TitleH2>
                                            {item.price} ARS
                                        </Text.TitleH2>
                                    </Container>
                                </Container>
                                <Container style={{
                                    width: '20%'
                                }}>
                                    <Container row alignCenter>
                                        <Text.TitleH2>
                                            {item.price * item.quantity} ARS
                                    </Text.TitleH2>

                                    </Container>
                                </Container>
                            </Container>
                        )}
                    />
                </Container>
            </Container>
            <Container>
                <Container row alignEnd spaceBetween padded>
                    <Container>
                        <Text.Small>TOTAL</Text.Small>
                        <Text.TitleH1>{calculateTotal()} ARS</Text.TitleH1>
                    </Container>
                    <Button.Primary
                        disabled={items.length === 0}
                        title="COBRAR"
                        width={128}
                        onPress={handleFinish}
                    />
                </Container>
                <Spacer.Medium />
            </Container>
        </Container>
    );
}

export default PDV
