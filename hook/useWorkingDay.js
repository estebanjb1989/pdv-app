import React, { useState } from 'react'
import { fetchWorkingDay } from '../services/firebase'
import { WorkingDayTypes } from '../redux/types'
import { useSelector, useDispatch } from 'react-redux'

const useWorkingDay = (options) => {
    const [loadingWorkingDay, setLoadingWorkingDay] = useState(false)
    const dispatch = useDispatch()
    const workingDay = useSelector(state => state.workingDay.data)

    const refreshWorkingDay = () => {
        setLoadingWorkingDay(true)
        fetchWorkingDay((data) => {
            dispatch({
                type: WorkingDayTypes.SET_WORKING_DAY,
                payload: data,
            })
            setLoadingWorkingDay(false)
        }, (err) => {
            console.error(err)
            setLoadingWorkingDay(false)
        })
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
    }
}

export default useWorkingDay