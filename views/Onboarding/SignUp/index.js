import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { Button, Container, Text, Input, Spacer } from '../../../component'
import { useHeaderHidden } from '../../../hook'

const SignIn = () => {
    useHeaderHidden()

    const navigation = useNavigation()

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
                />
                <Input
                    label="PASSWORD"
                    secure
                />

                <Input
                    label="CONFIRMAR PASSWORD"
                    secure
                />
                <Spacer.Large />
                <Button.Primary
                    width={240}
                    title="Registrarse"
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
