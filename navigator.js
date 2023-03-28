import React from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { DefaultTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { light } from "./constants/theme";
import Views from "./views";
import { Loading } from "./component";
import { useWorkingDay } from "./hook";
import HomeAsset from "./assets/home.png";
import TPVAsset from "./assets/tpv.png";
import PDVAsset from "./assets/pdv.png";
import ReceptionAsset from "./assets/reception.png";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomSheet from "./component/BottomSheet";
import colors from "./constants/colors";
import config from "./constants/config";
import Config from "./constants/config";

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
  width: 48,
  height: 48,
};

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="PDV"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 72,
        },
        tabBarItemStyle: {
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Tabs/Root":
              return <Image source={HomeAsset} style={iconStyle} />;
            case "PDV":
              return <Image source={TPVAsset} style={iconStyle} />;
            case "Recepcion":
              return <Image source={ReceptionAsset} style={iconStyle} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: colors.dark2,
      })}
    >
      <Tab.Screen name="Tabs/Root" component={Views.Home} />
      <Tab.Screen name="PDV" component={Views.PDV} />
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
          width: 220,
        },
        headerTitleStyle: {
          color: "whitesmoke",
        },
      }}
    >
      <Drawer.Screen name={`${config.appName}`} component={TabsNavigation} />
      <Drawer.Screen name="Productos" component={Views.Inventory} />
      <Drawer.Screen name="Clientes" component={Views.Clients} />
      {/* <Drawer.Screen name="ADLC" component={Views.Inventory} />
      <Drawer.Screen name="Promos" component={Views.Inventory} />
      <Drawer.Screen name="Descuentos" component={Views.Inventory} />
      <Drawer.Screen name="Novedades" component={Views.Inventory} /> */}
      
      {/* <Drawer.Screen name="Mis pedidos" component={Views.Inventory} />
      <Drawer.Screen name="Mis datos" component={Views.Inventory} />
      <Drawer.Screen name="Eventos" component={Views.Inventory} /> */}
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  const credentials = useSelector((state) => state.session.credentials);
  console.log(credentials?.user);

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
        {credentials ? (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Drawer/Navigation"
              component={DrawerNavigation}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Onboarding/SignIn"
              component={Views.Onboarding.SignIn}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Onboarding/SignUp"
              component={Views.Onboarding.SignUp}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Onboarding/SignIn"
              component={Views.Onboarding.SignIn}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Onboarding/SignUp"
              component={Views.Onboarding.SignUp}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Drawer/Navigation"
              component={DrawerNavigation}
            />
          </Stack.Navigator>
        )}
      </AppContainer>
      <BottomSheet />
    </NavigationContainer>
  );
};

export default Navigator;
