import React from 'react'
import { Container, Text } from '../component'
import { useNavigation } from '@react-navigation/native'

const useHeaderTitle = (title) => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            title,
        })
    }, [navigation])

    return null
}

export default useHeaderTitle