import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from '../../../component'
import { useHeaderHidden } from '../../../hook'
import { useNavigation } from '@react-navigation/native'
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { useDispatch } from 'react-redux'

const SignIn = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useHeaderHidden()

    return (
        <Container flex alignCenter justifyCenter>
            <Text.TitleH1>
                PDV App
            </Text.TitleH1>
        </Container>
    );
}

export default SignIn
