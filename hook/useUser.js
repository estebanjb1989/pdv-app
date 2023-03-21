import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { fetchUsers } from '../services/firebase'
import { UserTypes } from '../redux/types'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref as dbRef, set, remove, update } from 'firebase/database';

const useUser = (options) => {
    const [loadingUsers, setLoadingUsers] = useState(false)
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.list)
    const navigation = useNavigation()

    const refreshUsers = () => {
        setLoadingUsers(true)
        fetchUsers((data) => {
            dispatch({
                type: UserTypes.SET_USERS,
                payload: Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }))
            })
            setLoadingUsers(false)
        }, (err) => {
            console.error(err)
            setLoadingUsers(false)
        })
    }

    const submitMember = async (values) => {
        const db = getDatabase();
        const reference = dbRef(db, 'user/' + values.name);
        await set(reference, values)
        refreshUsers()
    }

    const submitRoles = async (selectedValues) => {
        const db = getDatabase();
        for (const key in selectedValues) {
            const reference = dbRef(db, 'user/' + key);
            const payload = {
                role: selectedValues[key],
            }
            await update(reference, payload);
        }
        refreshUsers()
        navigation.goBack()
    }

    const deleteUser = (values) => {
        const db = getDatabase();
        const reference = dbRef(db, 'user/' + values.name);
        remove(reference).finally(() => {
            refreshUsers()
        })
    }

    React.useEffect(() => {
        if (options?.refreshOnLoad) {
            refreshUsers()
        }
    }, [])

    return {
        loadingUsers,
        users,
        refreshUsers,
        submitMember,
        submitRoles,
        deleteUser
    }
}

export default useUser