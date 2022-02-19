import React from 'react'
import { Container, Text, Spacer } from '../component'
import { useNavigation } from '@react-navigation/native'

const useBackButton = () => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <Container onPress={navigation.goBack} row>
                        <Spacer.Medium />
                        <Text.Body>⬅️</Text.Body>
                    </Container>
                )
            }
        })
    }, [navigation])

    return null
}

export default useBackButton