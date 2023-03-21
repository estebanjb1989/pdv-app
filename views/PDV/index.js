import React, { useState, useEffect } from 'react';
import { FlatList, Image } from 'react-native'
import { Button, Container, Text, Spacer, Loading } from '../../component'
import { useBackButton, useScanner, useHeaderTitle, useInventory, useUserHeader, useDrawerToggler } from '../../hook'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    updateCart,
    handleDelete,
    handleFinish,
    calculateTotal,
    validateBarcode,
} from '../../business/pdv'
import styles from './styles'
import BarcodeAsset from '../../assets/barcode.png'

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

    useScanner((barcode) => {
        setBarcodeScanned(barcode)
    })
    useDrawerToggler()
    useUserHeader()

    useEffect(() => {
        if (!barcodeScanned || !inventory?.length) {
            return
        }

        const item = validateBarcode(barcodeScanned, inventory)
        if (!item) {
            return
        }

        setBarcodeScanned(null)
        setInventoryItemScanned({
            ...item,
            scannedAt: Date.now(),
        })
    }, [barcodeScanned, inventory])

    useEffect(() => {
        if (!inventoryItemScanned) {
            return
        }
        updateCart(inventoryItemScanned, items, setItems, inventory)
    }, [inventoryItemScanned])

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
                                            {item.description} (Quedan {item.stock - item.quantity || 0})
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
                                        onPress={handleDelete(items, item, setItems)}
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
                    <Text.BodyBold fontSize={24}>{calculateTotal(items)} ARS</Text.BodyBold>
                </Container>
                <Container alignCenter>
                    <Button.Primary
                        disabled={items.length === 0}
                        title="COBRAR PEDIDO"
                        width={196}
                        onPress={() => handleFinish(credentials, items, setItems, refreshInventory)}
                    />
                    <Spacer.Medium />
                </Container>
            </Container>
        </Container>
    );
}

export default PDV
