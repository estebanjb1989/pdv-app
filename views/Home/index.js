import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from '../../component'
import { useNavigation } from '@react-navigation/native'
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { InventoryTypes, SalesTypes } from '../../redux/types'
import { useDispatch } from 'react-redux'

const Home = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    useEffect(() => {
        const db = getDatabase();
        const path = 'inventory'
        const reference = dbRef(db, path);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            if (!data) return
            /* Update in memory array */
            dispatch({
                type: InventoryTypes.SET_INVENTORY,
                payload: Object.keys(data).map(key => data[key])
            })
        })
    }, [])

    useEffect(() => {
        const db = getDatabase();
        const path = 'sales'
        const reference = dbRef(db, path);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            if (!data) return
            /* Update in memory array */
            dispatch({
                type: SalesTypes.SET_SALES,
                payload: Object.keys(data).map(key => data[key])
            })
        })
    }, [])

    return (
        <Container row justifyCenter alignCenter wrap>
            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('PDV')
            }}>
                <Text.TitleH3>PDV</Text.TitleH3>
            </Container>
            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('Sales')
            }}>
                <Text.TitleH3>Ventas</Text.TitleH3>
            </Container>
            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('Prices')
            }}>
                <Text.TitleH3>Precios</Text.TitleH3>
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
            <Container style={styles.menuItem} onPress={() => {
                navigation.navigate('Onboarding/SignIn')
            }}>
                <Text.TitleH3>Salir</Text.TitleH3>
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