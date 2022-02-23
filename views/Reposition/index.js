import React, { useCallback, useState, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Button, Container, Text, Spacer } from '../../component'
import { useBackButton, useScanner, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dialog = require('electron').remote.dialog 

const Reposition = () => {
    const [items, setItems] = useState([])
    const [scanned, setScanned] = useState(null)
    const inventory = useSelector(state => state.inventory.list)
    const [credentials, setCredentials] = useState(null)

    useHeaderTitle("Reposicion")
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
            message: "Confirma la reposicion?"
        }
        const response = await dialog.showMessageBoxSync(options)
        if (response === 0) {
            const db = getDatabase();
            for(const item of items) {
                const reference = dbRef(db, 'inventory/' + item.barcode);
                console.log(item)
                set(reference, {
                    barcode: item.barcode,
                    category: item.category,
                    stock: (item.stock || 0) + item.quantity,
                    description: item.description,
                    price: item.price,
                    productId: item.productId,
                });
            }
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
                            </Container>
                        )}
                    />
                </Container>
            </Container>
            <Container>
                <Container row alignEnd justifyEnd padded>
                    <Button.Primary
                        disabled={items.length === 0}
                        title="FINALIZAR"
                        width={128}
                        onPress={handleFinish}
                    />
                </Container>
                <Spacer.Medium />
            </Container>
        </Container>
    );
}

export default Reposition
