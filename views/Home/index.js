import React from 'react';
import { Container, Text, Spacer } from '../../component'
import { useNavigation } from '@react-navigation/native'
import menu from '../../constants/menu'
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderTitle, useIsMobile } from '../../hook';
import { SessionTypes } from '../../redux/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'

const Home = () => {
    const credentials = useSelector(state => state.session.credentials)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isMobile = useIsMobile()

    useHeaderTitle('𓃰    PDV App')

    return (
        <Container flex spaceBetween alignCenter>
            <Container />
            <Container row justifyCenter alignCenter wrap>
                {menu.sort((a, b) => a.order - b.order).map((menuItem) => (
                    <Container
                        key={menuItem.title}
                        style={isMobile ? styles.menuItemMobile : styles.menuItem}
                        onPress={async () => {
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
                <div id="cam">

                </div>
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