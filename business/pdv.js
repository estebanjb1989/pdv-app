import { getDatabase, ref, push, set } from 'firebase/database';

const dialog = require('electron').remote.dialog

export const validateBarcode = (barcode, inventory) => {
    const item = inventory.find(item => (
        item.barcode.toString() === barcode
    ))

    if (!item) {
        alert(barcode + ' no encontrado')
        return null
    }

    if (!item.price) {
        alert(barcode + ' no tiene precio')
        return null
    }

    if (!item.stock) {
        alert(barcode + ' no tiene stock')
        return null
    }

    return item
}

export const updateCart = (scannedProduct, items, setItems, inventory) => {
    const existingItem = items.find(item => (
        item.barcode === scannedProduct.barcode
    ))

    const qty = (existingItem?.quantity || 0) + 1
    const inventoryItem = inventory.find(item => item.barcode === scannedProduct.barcode)
    if (inventoryItem.stock - qty < 0) {
        alert('No hay stock suficiente')
        return
    }

    if (existingItem) {
        setItems(items.map(item => (
            item.barcode === scannedProduct.barcode ?
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

export const calculateTotal = (items) => {
    return items.reduce((carry, value) => {
        return carry + (value.price * value.quantity)
    }, 0)
}

export const handleDelete = (items, item, setItems) => () => {
    if (item.quantity === 1) {
        setItems(items.filter(cartItem => (
            cartItem.barcode !== item.barcode
        )))
        return
    }

    setItems(
        items.map(cartItem => (
            cartItem.barcode === item.barcode ?
                { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        ))
    )
}

export const handleFinish = async (credentials, items, setItems, refreshInventory) => {
    let options = {
        buttons: ["Si", "No"],
        message: "Confirma la venta?"
    }
    const response = dialog.showMessageBoxSync(options)
    if (response === 0) {
        const db = getDatabase();
        let reference = ref(db, 'sales');
        await push(reference, {
            userEmail: credentials.user.email,
            items,
            total: calculateTotal(items),
            soldOutAt: Date.now(),
        });

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
        setItems([])
    }
}