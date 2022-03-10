import React, { useEffect, useState } from 'react'
import { fetchInventory } from '../services/firebase'
import { InventoryTypes } from '../redux/types'
import { useSelector, useDispatch } from 'react-redux'

const useInventory = () => {
    const [loadingInventory, setLoadingInventory] = useState(false)
    const dispatch = useDispatch()
    const inventory = useSelector(state => state.inventory.list)

    const refreshInventory = async () => {
        setLoadingInventory(true)
        try {
            const data = await fetchInventory()
            dispatch({
                type: InventoryTypes.SET_INVENTORY,
                payload: Object.keys(data).map(key => data[key])
            })
            return data.filter(item => item !== null)
        } catch (error) {
            return null
            // lo manejamos dsp
        } finally {
            setLoadingInventory(false)
        }
    }

    useEffect(() => {
        refreshInventory()
    }, [])

    return {
        loadingInventory,
        inventory,
        refreshInventory,
    }
}

export default useInventory