import React, { useCallback } from 'react';
import { FlatList } from 'react-native'
import { Button, Container, Text, Spacer } from '../../component'
import { useBackButton, useScanner, useHeaderTitle } from '../../hook'
import { useDispatch, useSelector } from 'react-redux'

const inventoryMock = [{
    id: 1,
    productId: 4,
    barcode: '111',
    description: 'CEPILLO',
    price: 20,
}, {
    id: 2,
    productId: 5,
    barcode: '222',
    description: 'JABON',
    price: 40,
}]

const PDV = () => {
    const dispatch = useDispatch()
    const [cartItems, setCartItems] = React.useState([])
    const [scanned, setScanned] = React.useState(null)
    const inventory = useSelector(state => state.inventory.list)

    useHeaderTitle("Punto de venta")
    useBackButton()
    useScanner(useCallback((barcode) => {
        const item = inventoryMock.find(item => (
            item.barcode === barcode
        ))
        if (!item) {
            alert(barcode + ' no encontrado')
        }
        else {
            setScanned({
                ...item,
                scannedAt: Date.now(),
            })
        }
    }, [setScanned]))

    React.useEffect(() => {
        if (!scanned) {
            return
        }
        updateCart(scanned)
    }, [scanned])

    const updateCart = (scannedProduct) => {
        const existingItem = cartItems.find(item => (
            item.productId === scannedProduct.productId
        ))

        if (existingItem) {

            setCartItems(cartItems.map(item => (
                item.productId === scannedProduct.productId ?
                    { ...item, quantity: item.quantity + 1 } : item
            )))
        }
        else {
            setCartItems([
                ...cartItems,
                {
                    id: cartItems.length + 1,
                    quantity: 1,
                    ...scannedProduct,
                }
            ])
        }
    }

    const calculateTotal = () => {
        return cartItems.reduce((carry, value) => {
            return carry + (value.price * value.quantity)
        }, 0)
    }

    const handleDelete = (item) => () => {
        if (item.quantity === 1) {
            setCartItems(cartItems.filter(cartItem => (
                cartItem.productId !== item.productId
            )))
            return
        }

        setCartItems(
            cartItems.map(cartItem => (
                cartItem.productId === item.productId ?
                    { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            ))
        )
    }

    const handleFinish = () => {
        
        setCartItems([])
    }

    return (
        <Container flex spaceBetween>
            <Container row spaceBetween padded>
                <Container fullWidth>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={cartItems}
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
                                {!cartItems.length &&
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
            <Container row alignEnd spaceBetween padded>
                <Container>
                    <Text.Small>TOTAL</Text.Small>
                    <Text.TitleH1>{calculateTotal()} ARS</Text.TitleH1>
                </Container>                
                <Button.Primary 
                    title="COBRAR" 
                    width={128}
                    onPress={handleFinish}
                />
            </Container>
        </Container>
    );
}

export default PDV
