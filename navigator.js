import React from 'react'
import { useSelector } from 'react-redux'
import { DefaultTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { light } from "./constants/theme";
import Views from './views'

const Navigator = () => {
    const Stack = createStackNavigator();
    const credentials = useSelector(state => state.session.credentials)

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
                initialRouteName={credentials ? "Home" : "Onboarding/SignIn"}
                screenOptions={{
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="Home" component={Views.Home} />
                <Stack.Screen name="Adjustments" component={Views.Adjustments} />
                <Stack.Screen name="PDV" component={Views.PDV} />
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