import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { fetchClients } from '../services/firebase'
import { ClientTypes } from '../redux/types'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref as dbRef, set, remove, update } from 'firebase/database';

const useClients = (options) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    // add reducer
    const clients = useSelector(state => state.client.list)
    const navigation = useNavigation()

    const refresh = () => {
        setLoading(true)
        // implementar
        fetchClients((data) => {
            dispatch({
                // agregar type
                type: ClientTypes.SET_LIST,
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
        const reference = dbRef(db, 'clients/' + values.name);
        await set(reference, values)
        refresh()
    }

    const remove = (values) => {
        const db = getDatabase();
        const reference = dbRef(db, 'clients/' + values.name);
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
        clients,
        refresh,
        submit,
        remove
    }
}

export default useClients