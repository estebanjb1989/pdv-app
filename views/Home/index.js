import React from "react";
import { Container, Text, Spacer, Button, Input } from "../../component";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Config from "../../constants/Config";
import { useDispatch, useSelector } from "react-redux";
import {
  useHeaderTitle,
  useIsMobile,
  useBackButton,
  useHeaderRight,
  useDrawerToggler,
} from "../../hook";
import { SessionTypes } from "../../redux/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import colors from "../../constants/colors";
import roles from "../../constants/roles";
import useUserHeader from "../../hook/useUserHeader";
import AddAsset from "../../assets/add.png";
import ListAsset from "../../assets/list.png";
import bsActions from "../../redux/modules/bottomSheet";

const Home = () => {
  const credentials = useSelector((state) => state.session.credentials);
  const workingDay = useSelector((state) => state.workingDay.data);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  // useHeaderTitle(Config.appName);
  // useBackButton(null);
  // useWaiterTables();
  useUserHeader();
  useDrawerToggler()

  const role = roles.find((rl) => rl.name === "fullescabio" /*Config.mode*/);
  //const role = FullEscabioRole;
  if (role?.usingWorkingDay) {
    if (!workingDay?.started) {
      menu = MenuProviderWorkingDay;
    }
  }

  const handlePress = (menuItem) => async () => {
    if (menuItem.route === "Onboarding/SignIn") {
      dispatch({
        type: SessionTypes.SET_USER,
        payload: null,
      });
      await AsyncStorage.setItem("@credentials", null);
    }
    navigation.navigate(menuItem.route);
  };
  return (
    <Container flex spaceBetween alignCenter>
      <Container />
      <Container row justifyCenter alignCenter wrap>
        {role.menu
          .sort((a, b) => a.order - b.order)
          .map((menuItem) => (
            <Container
              key={menuItem.title}
              style={
                !menuItem.type === "Lookup"
                  ? isMobile
                    ? styles.menuItemMobile
                    : styles.menuItem
                  : styles.menuItemLookup
              }
              noFeedback={menuItem.type === "Lookup"}
              onPress={menuItem.type !== "Lookup" && handlePress(menuItem)}
            >
              {menuItem.asset && (
                <Image
                  source={
                    menuItem.asset || {
                      uri: "https://via.placeholder.com/32x32",
                    }
                  }
                  style={{
                    width: 56,
                    height: 56,
                  }}
                />
              )}
              <Container row spaceBetween fullWidth alignCenter>
                <Container row alignCenter onPress={handlePress(menuItem)}>
                  <Container>
                    <Image
                      source={ListAsset}
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 8,
                        marginTop: 2,
                      }}
                    />
                  </Container>
                  <Text.TitleH3>
                    {menuItem.title.toLocaleUpperCase()}
                  </Text.TitleH3>
                </Container>
                {menuItem.cta_add_link && (
                  <Container
                    row
                    onPress={() => {
                      dispatch(
                        bsActions.open(menuItem.cta_add_link, {
                          onSubmit: (values) => {},
                        })
                      );
                    }}
                  >
                    <Image
                      source={AddAsset}
                      style={{
                        width: 24,
                        height: 24,
                        marginTop: 2,
                      }}
                    />
                  </Container>
                )}
              </Container>
              {menuItem.type === "Lookup" && (
                <Container
                  style={{
                    paddingRight: 48,
                  }}
                >
                  <Container>
                    <Spacer.Medium />
                    <Input placeholder="Buscar..." />
                  </Container>
                </Container>
              )}
            </Container>
          ))}
      </Container>
      <Container>
        <Spacer.Medium />
      </Container>
    </Container>
  );
};

export default Home;
