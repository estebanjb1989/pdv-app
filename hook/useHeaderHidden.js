import React from 'react'
import { useNavigation } from '@react-navigation/native'

const useHeaderHidden = () => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    return null
}

export default useHeaderHidden