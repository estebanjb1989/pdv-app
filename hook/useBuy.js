import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { fetchClients } from '../services/firebase'
import { BuyTypes } from '../redux/types'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref as dbRef, set, remove, update } from 'firebase/database';

const useBuy = (options) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    // add reducer
    const buy = useSelector(state => state.buy.list)
    const navigation = useNavigation()

    const refresh = () => {
        setLoading(true)
        // implementar
        fetchClients((data) => {
            dispatch({
                // agregar type
                type: BuyTypes.SET_LIST,
                payload: Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }))
            })
            setLoading(false)
        }, (err) => {
            console.error(err)
            setLoading(false)
        })
    }

    const submit = async (values) => {
        const db = getDatabase();
        const reference = dbRef(db, 'buy/' + values.name);
        await set(reference, values)
        refresh()
    }

    const remove = (values) => {
        const db = getDatabase();
        const reference = dbRef(db, 'buy/' + values.name);
        remove(reference).finally(() => {
            refresh()
        })
    }

    React.useEffect(() => {
        if (options?.refreshOnLoad) {
            refresh()
        }
    }, [])

    return {
        loading,
        buy,
        refresh,
        submit,
        remove
    }
}

export default useBuy