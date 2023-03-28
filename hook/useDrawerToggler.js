import React from "react";
import { Image } from "react-native-web";
import { Container, Text, Spacer } from "../component";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DrawerAsset from "../assets/drawer.png";
import { AvatarComponent } from "./useUserHeader";

const useDrawerToggler = (icon = undefined, isHeaderLeft = false) => {
  const navigation = useNavigation();
  const user = useSelector(({ session }) => session.credentials);

  const Toggler = () => {
    return (
      <Container onPress={navigation.toggleDrawer} row>
        <Image
          source={DrawerAsset}
          style={{
            width: 40,
            height: 40,
            marginRight: 16,
          }}
        />
      </Container>
    );
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (isHeaderLeft ? <Toggler /> : null),
      headerRight: () =>
        !isHeaderLeft ? (
          <Container row>
            <AvatarComponent />
            <Toggler />
          </Container>
        ) : null,
      headerTitleStyle: {
        color: "whitesmoke",
      },
    });
  }, [navigation, isHeaderLeft]);

  return null;
};

export default useDrawerToggler;
