import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DefaultTheme, useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { light } from "./constants/theme";
import Views from "./views";
import { Container, Loading } from "./component";
import { useWorkingDay } from "./hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SessionTypes } from "./redux/types";
import { TabView, SceneMap } from "react-native-tab-view";
import HomeAsset from "./assets/home.png";
import PDVAsset from "./assets/pdv.png";
import ReceptionAsset from "./assets/reception.png";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomSheet from './component/BottomSheet'
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppContainer = ({ children }) => {
  const { loadingWorkingDay } = useWorkingDay({
    refreshOnLoad: true,
  });

  if (loadingWorkingDay) {
    return <Loading />;
  }

  return children;
};

const Tab = createBottomTabNavigator();

const iconStyle = {
  width: 24,
  height: 24,
};

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return <Image source={HomeAsset} style={iconStyle} />;
            case "PDV":
              return <Image source={PDVAsset} style={iconStyle} />;
            case "Recepcion":
              return <Image source={ReceptionAsset} style={iconStyle} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Views.Home} />
      <Tab.Screen name="PDV" component={Views.PDV} />
      <Tab.Screen name="Recepcion" component={Views.Reception} />
    </Tab.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "white",
          width: "75%",
        },
        headerTitleStyle: {
          color: "whitesmoke",
        },
      }}
    >
      <Drawer.Screen name="Home" component={TabsNavigation} />
      <Drawer.Screen name="Clientes" component={Views.Inventory} />
      <Drawer.Screen name="ADLC" component={Views.Inventory} />
      <Drawer.Screen name="Promos" component={Views.Inventory} />
      <Drawer.Screen name="Descuentos" component={Views.Inventory} />
      <Drawer.Screen name="Novedades" component={Views.Inventory} />
      <Drawer.Screen name="Productos" component={Views.Inventory} />
      <Drawer.Screen name="Mis pedidos" component={Views.Inventory} />
      <Drawer.Screen name="Mis datos" component={Views.Inventory} />
      <Drawer.Screen name="Eventos" component={Views.Inventory} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  const credentials = useSelector((state) => state.session.credentials);

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
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="DrawerNavigation"
            component={DrawerNavigation}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SignIn"
            component={Views.Onboarding.SignIn}
          />
        </Stack.Navigator>
      </AppContainer>
      <BottomSheet />
    </NavigationContainer>
  );
};

export default Navigator;
