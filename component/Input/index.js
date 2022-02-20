import React from 'react'
import { TextInput } from 'react-native'
import Container from '../Container'
import Text from '../Text'
import Spacer from '../Spacer'

const Input = ({
    label,
    autoFocus,
    secure,
    placeholder,
}) => {
    return (
        <Container>
            <Spacer.Medium />
            <Text.Small>{label}</Text.Small>
            <Spacer.Small />
            <TextInput
                placeholder={placeholder}
                secureTextEntry={secure}
                autoFocus={autoFocus}
                style={{
                    width: 240,
                    height: 50,
                    backgroundColor: 'whitesmoke',
                    borderRadius: 6,
                    paddingHorizontal: 12,
                }}
            />
        </Container>
    )
}

export default Input