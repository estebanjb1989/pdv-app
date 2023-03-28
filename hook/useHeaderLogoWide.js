import React from "react";
import { Image, Text } from "react-native-web";
import { Container } from "../component";
import { useNavigation } from "@react-navigation/native";
import LogoWide from "../assets/logo-wide.png";

const useHeaderLogoWide = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: () => (
        <Image
          source={LogoWide}
          style={{
            width: 160,
            height: 55,
            marginLeft: 12,
          }}
        />
      ),
    });
  }, [navigation]);
  console.log("hook");
  return null;
};

export default useHeaderLogoWide;
