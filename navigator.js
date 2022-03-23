import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { light } from "./constants/theme";
import Views from './views'
import { Loading } from './component'
import { useWorkingDay } from './hook'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionTypes } from './redux/types'

const Stack = createStackNavigator();

const AppContainer = ({
    children
}) => {
    const {
        loadingWorkingDay,
    } = useWorkingDay({
        refreshOnLoad: true,
    })

    if (loadingWorkingDay) {
        return <Loading />
    }

    return children
}

const Navigator = () => {
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
            <AppContainer>
                <Stack.Navigator
                    initialRouteName={credentials?.user ? 'Home' : "Onboarding/SignIn"}
                    screenOptions={{
                        gestureEnabled: false,
                    }}
                >
                    <Stack.Screen name="Home" component={Views.Home} />
                    <Stack.Screen name="Adjustments" component={Views.Adjustments} />
                    <Stack.Screen name="Control" component={Views.Control} />
                    <Stack.Screen name="DeliveryCategory" component={Views.DeliveryCategory} />
                    <Stack.Screen name="DeliveryProduct" component={Views.DeliveryProduct} />
                    <Stack.Screen name="PDV" component={Views.PDV} />
                    <Stack.Screen name="Reception" component={Views.Reception} />
                    <Stack.Screen name="Inventory" component={Views.Inventory} />
                    <Stack.Screen name="Prices" component={Views.Prices} />
                    <Stack.Screen name="Sales" component={Views.Sales} />
                    <Stack.Screen name="Staff" component={Views.Staff} />
                    <Stack.Screen name="WorkingDay" component={Views.WorkingDay} />
                    <Stack.Screen name="Onboarding/SignIn" component={Views.Onboarding.SignIn} />
                    <Stack.Screen name="Onboarding/SignUp" component={Views.Onboarding.SignUp} />
                </Stack.Navigator>
            </AppContainer>
        </NavigationContainer>
    )
}

export default Navigator