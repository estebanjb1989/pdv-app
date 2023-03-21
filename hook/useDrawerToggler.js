import React from 'react'
import { Image } from "react-native-web"
import { Container, Text, Spacer } from '../component'
import { useNavigation } from '@react-navigation/native'
import DrawerAsset from "../assets/drawer.png"

const useDrawerToggler = (icon = undefined) => {
    const navigation = useNavigation()

    React.useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: icon === null ? null : () => {
                return (
                    <Container onPress={navigation.toggleDrawer} row>
                        <Image source={DrawerAsset} style={{
                            width: 32,
                            height: 32,
                            marginLeft: 12,
                        }} />
                    </Container>
                )
            }
        })
    }, [navigation])

    return null
}

export default useDrawerToggler