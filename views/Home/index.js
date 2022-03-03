import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Text, Spacer } from '../../component'
import { useNavigation } from '@react-navigation/native'
import { InventoryTypes, SalesTypes, SessionTypes } from '../../redux/types'
import menu from '../../constants/menu'
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderTitle, useIsMobile } from '../../hook';
import { fetchInventory, fetchSales } from '../../services/firebase'
import colors from '../../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'

const Home = () => {
    const [loadingInventory, setLoadingInventory] = useState(false)
    const [loadingSales, setLoadingSales] = useState(false)
    const credentials = useSelector(state => state.session.credentials)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isMobile = useIsMobile()

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
                <ActivityIndicator size="large" color={colors.tertiary} />
            </Container>
        )
    }

    return (
        <Container flex spaceBetween alignCenter>
            <Container />
            <Container row justifyCenter alignCenter wrap>
                {menu.sort((a, b) => a.order - b.order).map((menuItem) => (
                    <Container
                        key={menuItem.title}
                        style={isMobile ? styles.menuItemMobile : styles.menuItem}
                        onPress={async () => {
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
                            if (menuItem.route === 'Inventory') {
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
                            }
                            if (menuItem.route === 'Onboarding/SignIn') {
                                dispatch({
                                    type: SessionTypes.SET_USER,
                                    payload: null,
                                })
                                await AsyncStorage.setItem('@credentials', null)
                            }
                            navigation.navigate(menuItem.route)
                        }}>
                        <Text.TitleH3>{menuItem.title.toLocaleUpperCase()}</Text.TitleH3>
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

export default Home