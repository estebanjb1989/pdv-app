import React from 'react'
import { Container, Text, Spacer } from '../component'
import { useNavigation } from '@react-navigation/native'

const useBackButton = (icon = undefined) => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: icon === null ? null : () => {
                return (
                    <Container onPress={navigation.goBack} row>
                        <Spacer.Medium />
                        <Text.Body>{icon || '⬅️'}</Text.Body>
                    </Container>
                )
            }
        })
    }, [navigation])

    return null
}

export default useBackButton