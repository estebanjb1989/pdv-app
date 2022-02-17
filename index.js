import React from "react";
import { registerRootComponent } from "expo";

import { DefaultTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { light } from "./constants/theme";
import Views from './views'

const Stack = createStackNavigator();

function App() {
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
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Home" component={Views.Home} />
        <Stack.Screen name="Ajustes" component={Views.Ajustes} />
        <Stack.Screen name="PDV" component={Views.PDV} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
