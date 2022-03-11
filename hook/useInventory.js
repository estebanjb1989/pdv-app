import React, { useState } from 'react'
import { fetchInventory } from '../services/firebase'
import { InventoryTypes } from '../redux/types'
import { useSelector, useDispatch } from 'react-redux'

const useInventory = (options) => {
    const [loadingInventory, setLoadingInventory] = useState(false)
    const dispatch = useDispatch()
    const inventory = useSelector(state => state.inventory.list)

    const refreshInventory = () => {
        setLoadingInventory(true)
        fetchInventory((data) => {
            dispatch({
                type: InventoryTypes.SET_INVENTORY,
                payload: Object.keys(data).map(key => data[key])
            })
            setLoadingInventory(false)
        }, (err) => {
            console.error(err)
            setLoadingInventory(false)
        })
    }

    React.useEffect(() => {
        if (options?.refreshOnLoad) {
            refreshInventory()
        }
    }, [])

    return {
        loadingInventory,
        inventory,
        refreshInventory,
    }
}

export default useInventory