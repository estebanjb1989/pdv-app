import React, { useCallback } from 'react';
import { FlatList } from 'react-native'
import { Button, Container, Text, Spacer } from '../../component'
import { useBackButton, useScanner, useHeaderTitle } from '../../hook'
import { useSelector } from 'react-redux'

const PDV = () => {
    const [cartItems, setCartItems] = React.useState([])
    const [scanned, setScanned] = React.useState(null)
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
        <Container flex alignCenter justifyCenter>
            <Text.TitleH1>Escanee un producto...</Text.TitleH1>
        </Container>
    );
}

export default PDV
