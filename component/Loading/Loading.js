import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Container } from '../index'

const Loading = () => {
    return (
        <Container flex alignCenter justifyCenter>
            <ActivityIndicator />
        </Container>
    )
}

export default Loading