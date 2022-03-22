import React, { useState } from 'react'
import { fetchWorkingDay } from '../services/firebase'
import { WorkingDayTypes, SessionTypes } from '../redux/types'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref as dbRef, set, push } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'

const useWorkingDay = (options) => {
    const [loadingWorkingDay, setLoadingWorkingDay] = useState(false)
    const dispatch = useDispatch()
    const workingDay = useSelector(state => state.workingDay.data)
    const navigation = useNavigation()

    const createWorkingDay = async (credentials) => {
        const db = getDatabase();
        const reference = dbRef(db, 'workingDay/' + credentials.user.email.split('@')[0]);

        const payload = {
            createdAt: Date.now(),
            updatedAt: Date.now(),
            started: false,
            finished: false,
            moneyBegin: 0,
            moneyEnd: 0,
        }

        await set(reference, payload);
        dispatch({
            type: WorkingDayTypes.SET_WORKING_DAY,
            payload,
        })
    }

    const refreshWorkingDay = async () => {
        const creds = await AsyncStorage.getItem('@credentials')

        if (!creds) {
            throw 'Invalid credentials'
        }

        const credentials = JSON.parse(creds)

        dispatch({
            type: SessionTypes.SET_USER,
            payload: credentials
        })

        setLoadingWorkingDay(true)
        fetchWorkingDay(credentials, (data) => {
            if (moment(data.updatedAt).diff(moment(), 'hours') < -12) {
                createWorkingDay(credentials)
            }
            else {
                dispatch({
                    type: WorkingDayTypes.SET_WORKING_DAY,
                    payload: data,
                })
            }
            setLoadingWorkingDay(false)
        }, (err) => {
            console.error(err)
            setLoadingWorkingDay(false)
        })
    }

    const updateWorkingDay = async (moneyBegin, moneyEnd) => {
        const creds = await AsyncStorage.getItem('@credentials')

        if (!creds) {
            throw 'Invalid credentials'
        }

        const credentials = JSON.parse(creds)

        const db = getDatabase();
        const reference = dbRef(db, 'workingDay/' + credentials.user.email.split('@')[0]);

        const payload = {
            ...workingDay,
            updatedAt: Date.now(),
        }

        if (!workingDay?.started) {
            payload.started = true
            payload.finished = false
            payload.moneyBegin = moneyBegin
            payload.moneyEnd = 0
            await set(reference, payload);
            dispatch({
                type: WorkingDayTypes.SET_WORKING_DAY,
                payload,
            })
        }
        else {
            payload.started = true
            payload.finished = true
            payload.moneyEnd = moneyEnd
            const historyReference = dbRef(db, 'workingDayHistory/' + credentials.user.email.split('@')[0]);
            await push(historyReference, payload)
            createWorkingDay(credentials)
        }
        navigation.navigate('Home')
    }

    React.useEffect(() => {
        if (options?.refreshOnLoad) {
            refreshWorkingDay()
        }
    }, [])

    return {
        loadingWorkingDay,
        workingDay,
        refreshWorkingDay,
        createWorkingDay,
        updateWorkingDay,
    }
}

export default useWorkingDay