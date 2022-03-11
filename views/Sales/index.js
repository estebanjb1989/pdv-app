import React, { useMemo } from 'react';
import { Loading, DataTable } from '../../component'
import { useBackButton, useHeaderTitle, useSales } from '../../hook'

const Sales = () => {    
    useBackButton()
    useHeaderTitle('Ventas')

    const {
        loadingSales,
        sales,
    } = useSales({
        refreshOnLoad: true,
    })

    const salesSorted = useMemo(() => {
        return sales.sort((a, b) => b.soldOutAt - a.soldOutAt)
    }, [sales])

    if (loadingSales) {
        return <Loading />
    }
    
    return (
        <DataTable
            keyField="soldOutAt"
            dataSource={salesSorted}
            columns={[{
                key: 'soldOutAt',
                title: 'Fecha',
                width: '20%',
                render: (original) => {
                    return new Date(original.soldOutAt).toLocaleDateString()
                }
            }, {
                key: 'userEmail',
                title: 'Vendedor',
                width: '60%',
            }, {
                key: 'total',
                title: 'Total (ARS)',
                width: '20%',
                alignEnd: true,
            }]}
            detail={(item) => (
                <DataTable
                    keyField="description"
                    dataSource={item.items}
                    columns={[{
                        key: 'description',
                        title: 'Producto',
                        width: '33.33%',
                    }, {
                        key: 'price',
                        title: 'Precio (ARS)',
                        width: '33.33%',
                    }, {
                        key: 'quantity',
                        title: 'Cantidad',
                        width: '33.33%'
                    }]}
                    allowPagination={false}
                />
            )}
        />
    )
}

export default Sales