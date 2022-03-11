import React from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../constants/colors'

const useHeaderTitle = (title) => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            title,
            headerTitleStyle: {
                color: colors.text
            }
        })
    }, [navigation])

    return null
}

export default useHeaderTitle