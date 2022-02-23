import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Spacer } from '../../component'
import { useNavigation } from '@react-navigation/native'
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { InventoryTypes, SalesTypes } from '../../redux/types'
import menu from '../../constants/menu'
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderTitle } from '../../hook';

const Home = () => {
    const credentials = useSelector(state => state.session.credentials)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useHeaderTitle('PDV App')

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
        <Container flex spaceBetween alignCenter>
            <Container />
            <Container row justifyCenter alignCenter wrap>
                {menu.sort((a, b) => a.order - b.order).map((menuItem, index) => (
                    <Container style={styles.menuItem} onPress={() => {
                        navigation.navigate(menuItem.route)
                    }}>
                        <Text.TitleH3>{menuItem.title}</Text.TitleH3>
                    </Container>
                ))}
            </Container>
            <Container>
                <Text.BodyBold>
                    {credentials?.user?.email}
                </Text.BodyBold>
                <Spacer.Medium />
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