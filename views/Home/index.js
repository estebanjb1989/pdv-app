import React from 'react';
import { Container, Text, Spacer } from '../../component'
import { useNavigation } from '@react-navigation/native'
import { MenuProvider, MenuClient, MenuProviderWorkingDay } from '../../constants/menu'
import Config from '../../constants/Config'
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderTitle, useIsMobile, useBackButton } from '../../hook';
import { SessionTypes } from '../../redux/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'

const Home = () => {
    const credentials = useSelector(state => state.session.credentials)
    const workingDay = useSelector(state => state.workingDay.data)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isMobile = useIsMobile()

    useHeaderTitle(Config.appName)
    useBackButton(null)

    let menu = Config.mode === 'PROVIDER' ? MenuProvider : MenuClient
    
    if (!workingDay?.started) {
        menu = MenuProviderWorkingDay
    }
// vin clone -vin VIN__
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