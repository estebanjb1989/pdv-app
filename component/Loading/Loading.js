import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Container } from '../index'
import colors from '../../constants/colors'

const Loading = () => {
    return (
        <Container flex alignCenter justifyCenter>
            <ActivityIndicator color={colors.secondary}/>
        </Container>
    )
}

export default Loading