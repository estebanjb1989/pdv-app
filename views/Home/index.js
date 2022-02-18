import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from '../../component'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation()
    return (
        <Container row justifyCenter alignCenter wrap>
            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('PDV')
            }}>
                <Text.TitleH3>PDV</Text.TitleH3>
            </Container>
            <Container style={styles.menuItem} onPress={() => {
                alert('Go to Reposicion')
            }}>
                <Text.TitleH3>Reposicion</Text.TitleH3>
            </Container>
            
            
            <Container style={styles.menuItem} onPress={() => {
                alert('Go to cierre de caja')
            }}>
                <Text.TitleH3>Cierre</Text.TitleH3>
            </Container>
            
            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('Ventas')
            }}>
                <Text.TitleH3>Ventas</Text.TitleH3>
            </Container>
            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('Inventory')
            }}>
                <Text.TitleH3>Inventario</Text.TitleH3>
            </Container>

            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('Adjustments')
            }}>
                <Text.TitleH3>Ajustes</Text.TitleH3>
            </Container>
        </Container>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        width: 128,
        height: 128,
        borderColor: 'gold',
        borderWidth: 1,
        borderRadius: 16,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home
/*
<LinearGradient colors={["white", "#3423ca"]} style={styles.container}>
            <Button
                onPress={() => {
                DocumentPicker.getDocumentAsync({
                    type: 'xls'
                })
                }}
                title="Importar Excel"
            />
            <Text>Open up App.tsx to start working on your app!!!</Text>
        </LinearGradient>*/