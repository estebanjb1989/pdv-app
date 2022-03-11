import React, { useState } from 'react'
import { fetchSales } from '../services/firebase'
import { SalesTypes } from '../redux/types'
import { useSelector, useDispatch } from 'react-redux'

const useSales = (options) => {
    const [loadingSales, setLoadingSales] = useState(false)
    const dispatch = useDispatch()
    const sales = useSelector(state => state.sales.list)

    const refreshSales = () => {
        setLoadingSales(true)
        fetchSales((data) => {
            dispatch({
                type: SalesTypes.SET_SALES,
                payload: Object.keys(data).map(key => data[key])
            })
            setLoadingSales(false)
        }, (err) => {
            console.error(err)
            setLoadingSales(false)
        })
    }

    React.useEffect(() => {
        if (options?.refreshOnLoad) {
            refreshSales()
        }
    }, [])

    return {
        loadingSales,
        sales,
        refreshSales,
    }
}

export default useSales