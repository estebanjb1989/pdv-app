import React from 'react'
import { TextInput } from 'react-native'
import Container from '../Container'
import Text from '../Text'
import Spacer from '../Spacer'
import styles from './styles'

const Input = ({
    label,
    autoFocus,
    secure,
    placeholder,
    onChange,
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
                style={styles.input}
                onChangeText={onChange}
            />
        </Container>
    )
}

export default Input