import React, { useEffect } from 'react';
import { FlatList } from 'react-native'
import { Container, Text, Spacer, Divider, DataTable, Loading } from '../../component'
import { useBackButton, useHeaderTitle, useIsMobile, useInventory } from '../../hook'

const Inventory = () => {
    useBackButton()
    useHeaderTitle('Inventario')
    const isMobile = useIsMobile()

    const {
        loadingInventory,
        inventory,
    } = useInventory({
        refreshOnLoad: true,
    })

    if (loadingInventory) {
        return <Loading />
    }

    return (
        <DataTable 
            keyField="barcode"
            dataSource={inventory}
            columns={[{
                key: 'description',
                title: 'Descripcion',
                width: '20%',
            }, {
                key: 'productId',
                title: 'Cod. Producto',
                width: '20%',
            }, {
                key: 'barcode',
                title: 'Cod. Barra',
                width: '20%'
            }, {
                key: 'price',
                title: 'Precio (ARS)',
                width: '20%',
                alignEnd: true,
            }, {
                key: 'stock',
                title: 'Stock',
                width: '20%',
                alignEnd: true,
            }]}
        />
    )
}

export default Inventory