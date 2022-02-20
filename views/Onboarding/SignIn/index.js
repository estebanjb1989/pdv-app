import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { Button, Container, Text, Input, Spacer } from '../../../component'
import { useHeaderHidden } from '../../../hook'

const SignIn = () => {
    useHeaderHidden()

    const navigation = useNavigation()

    const handleSignIn = () => {

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
                />
                <Input
                    label="PASSWORD"
                    secure
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
