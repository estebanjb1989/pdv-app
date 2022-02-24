import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Text, Spacer } from '../../component'
import { useNavigation } from '@react-navigation/native'
import { InventoryTypes, SalesTypes } from '../../redux/types'
import menu from '../../constants/menu'
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderTitle } from '../../hook';
import { fetchInventory, fetchSales } from '../../services/firebase'
import colors from '../../constants/colors'

const Home = () => {
    const [loadingInventory, setLoadingInventory] = useState(false)
    const [loadingSales, setLoadingSales] = useState(false)
    const credentials = useSelector(state => state.session.credentials)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useHeaderTitle('𓃰    PDV App')

    useEffect(() => {
        setLoadingInventory(true)
        fetchInventory(
            (data) => {
                dispatch({
                    type: InventoryTypes.SET_INVENTORY,
                    payload: Object.keys(data).map(key => data[key])
                })
                setLoadingInventory(false)
            },
            (err) => {
                setLoadingInventory(false)
            }
        )
    }, [])

    if (loadingInventory || loadingSales) {
        return (
            <Container flex alignCenter justifyCenter>
                <ActivityIndicator size="large" color={colors.text} />
            </Container>
        )
    }

    return (
        <Container flex spaceBetween alignCenter>
            <Container />
            <Container row justifyCenter alignCenter wrap>
                {menu.sort((a, b) => a.order - b.order).map((menuItem) => (
                    <Container key={menuItem.title} style={styles.menuItem} onPress={() => {
                        if (menuItem.route === 'Sales') {
                            setLoadingSales(true)
                            fetchSales(
                                (data) => {
                                    setLoadingSales(false)
                                    dispatch({
                                        type: SalesTypes.SET_SALES,
                                        payload: Object.keys(data).map(key => data[key])
                                    })
                                },
                                (err) => {
                                    setLoadingSales(false)
                                    console.log(err)
                                }
                            )
                        }
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
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 16,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Home