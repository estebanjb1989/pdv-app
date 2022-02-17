import React from 'react'
import { Container, Text } from '../component'
import { useNavigation } from '@react-navigation/native'

const useBackButton = () => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <Container onPress={navigation.goBack} padded>
                        <Text.Body>⬅️</Text.Body>
                    </Container>
                )
            }
        })
    }, [navigation])

    return null
}

export default useBackButton