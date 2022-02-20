import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Button, Container, Text, Input, Spacer } from '../../../component'
import { useHeaderHidden } from '../../../hook'
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth'
import { SessionTypes } from '../../../redux/types'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    useHeaderHidden()
    const dispatch = useDispatch()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const navigation = useNavigation()

    const handleForgot = async () => {
        if (!email?.length) {
            alert('Ingresa tu email')
            return
        }

        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
        } catch (err) {
            alert(err.message)
        }
        
    }

    const handleSignIn = async () => {
        if (!email?.length) {
            alert('Ingresa tu email')
            return
        }

        if (!password?.length) {
            alert('Ingresa tu password')
            return
        }

        try {
            const auth = getAuth()
            const credentials = await signInWithEmailAndPassword(auth, email, password)
            if (!credentials.user.emailVerified) {
                sendEmailVerification(credentials.user)
                throw ({
                    message: 'Email no verificado'
                })
            }
            dispatch({
                type: SessionTypes.SET_USER,
                payload: credentials,
            })
            await AsyncStorage.setItem('@credentials', JSON.stringify(credentials))
            navigation.navigate('Home')
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <Container
            flex
            alignCenter
            spaceBetween
        >
            <Container>
                <Spacer.Medium />
                <Text.TitleH1>
                    PDV App
            </Text.TitleH1>
            </Container>
            <Container>
                <Input
                    label="EMAIL"
                    autoFocus
                    placeholder="user@email.com"
                    onChange={(text) => setEmail(text)}
                />
                <Input
                    label="PASSWORD"
                    secure
                    onChange={(text) => setPassword(text)}
                />
                <Spacer.Small />
                <Button.Tertiary
                    title="Reset password"
                    onPress={handleForgot}
                />
                <Spacer.Large />
                <Button.Primary
                    width={240}
                    title="Ingresar"
                    onPress={handleSignIn}
                />
            </Container>
            <Container>
                <Button.Tertiary
                    title="Nuevo usuario? Registrate"
                    onPress={() => navigation.navigate('Onboarding/SignUp')}
                />
                <Spacer.Medium />
            </Container>
        </Container>
    );
}

export default SignIn
