import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DefaultTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { light } from "./constants/theme";
import Views from './views'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionTypes } from './redux/types'

const Stack = createStackNavigator();

const Navigator = () => {
    const dispatch = useDispatch()    
    const [credentials, setCredentials] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const creds = await AsyncStorage.getItem('@credentials')
        setCredentials(JSON.parse(creds))
        setLoading(false)
        dispatch({
            type: SessionTypes.SET_USER,
            payload: JSON.parse(creds)
        })
    }, [])

    if (loading) {
        return null
    }

    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: {
                    ...light,
                },
            }} 
        >
            <Stack.Navigator
                initialRouteName={credentials?.user ? "Home" : "Onboarding/SignIn"}
                screenOptions={{
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="Home" component={Views.Home} />
                <Stack.Screen name="Adjustments" component={Views.Adjustments} />
                <Stack.Screen name="PDV" component={Views.PDV} />
                <Stack.Screen name="Reposition" component={Views.Reposition} />
                <Stack.Screen name="Inventory" component={Views.Inventory} />
                <Stack.Screen name="Prices" component={Views.Prices} />
                <Stack.Screen name="Sales" component={Views.Sales} />
                <Stack.Screen name="Onboarding/SignIn" component={Views.Onboarding.SignIn} />
                <Stack.Screen name="Onboarding/SignUp" component={Views.Onboarding.SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator