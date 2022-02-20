import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from 'react-redux'
import { getStore } from './redux/Store'
import { DefaultTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { light } from "./constants/theme";
import Views from './views'
import { initFirebase } from './services/firebase'

const Stack = createStackNavigator();
initFirebase()

function App() {
  return (
    <Provider store={getStore()}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...light,
          },
        }}
      >
        <Stack.Navigator
          initialRouteName="Onboarding/SignIn"
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
    </Provider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
