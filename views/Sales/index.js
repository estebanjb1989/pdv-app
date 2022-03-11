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
                key: 'credentials.user.email',
                title: 'Vendedor',
                width: '80%',
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
                        width: '20%',
                    }]}
                />
            )}
        />
    )
}

export default Sales