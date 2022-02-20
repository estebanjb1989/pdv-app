import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Button, Container, Text, Input, Spacer } from '../../../component'
import { useHeaderHidden } from '../../../hook'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

const SignIn = () => {
    useHeaderHidden()
    const [email, setEmail] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [password2, setPassword2] = useState(null)

    const navigation = useNavigation()

    const handleSignUp = async () => {
        if (!email?.length) {
            alert('Email invalido')
            return
        }

        if (!password1?.length) {
            alert('Debe ingresar su password')
            return
        }

        if (!password2?.length) {
            alert('Debe reiterar su password')
            return
        }

        if (password1 !== password2) {
            alert('Password no coincide')
            return
        }
        
        try {
            const auth = getAuth()
            const credentials = await createUserWithEmailAndPassword(auth, email, password1)
            sendEmailVerification(credentials.user)
            alert('Te has registrado en PDV App! Por favor verifica tu email para ingresar')
            navigation.navigate('Onboarding/SignIn')
        } catch(err) {
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
                    PDV App - Registro
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
                    onChange={(text) => setPassword1(text)}
                />

                <Input
                    label="CONFIRMAR PASSWORD"
                    secure
                    onChange={(text) => setPassword2(text)}
                />
                <Spacer.Large />
                <Button.Primary
                    width={240}
                    title="Registrarse"
                    onPress={handleSignUp}
                />
            </Container>
            <Container>

                <Button.Tertiary 
                    title="Ya estas registrado? Ingresar" 
                    onPress={() => navigation.navigate('Onboarding/SignIn')}
                />
                <Spacer.Medium />
            </Container>
        </Container>
    );
}

export default SignIn
