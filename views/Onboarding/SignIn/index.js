import React, { useState } from "react";
import { Image } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Button, Container, Text, Input, Spacer } from "../../../component";
import { useHeaderHidden } from "../../../hook";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { SessionTypes } from "../../../redux/types";
import config from "../../../constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../../constants/colors";
import LogoAsset from "../../../assets/logo.jpeg";

const SignIn = () => {
  useHeaderHidden();

  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [signingIn, setSigningIn] = useState(false);

  const navigation = useNavigation();

  const handleForgot = async () => {
    if (!email?.length) {
      alert("Ingresa tu email");
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSignIn = async () => {
    if (!email?.length) {
      alert("Ingresa tu email");
      return;
    }

    if (!password?.length) {
      alert("Ingresa tu password");
      return;
    }

    try {
      setSigningIn(true);
      const auth = getAuth();
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!credentials.user.emailVerified) {
        sendEmailVerification(credentials.user);
        throw {
          message: "Email no verificado",
        };
      }
      dispatch({
        type: SessionTypes.SET_USER,
        payload: credentials,
      });
      await AsyncStorage.setItem("@credentials", JSON.stringify(credentials));
      navigation.navigate("Home");
    } catch (err) {
      alert(err.message);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <Container flex alignCenter spaceBetween>
      <Container />
      <Container>
        {/* <Image
          source={LogoAsset}
          style={{
            width: 128,
            height: 128,
          }}
        /> */}
        <Text.TitleH1>FullEscabio</Text.TitleH1>
      </Container>
      <Container>
        <Input
          label="EMAIL"
          autoFocus
          placeholder="user@email.com"
          onChange={(text) => setEmail(text)}
        />
        <Input label="PASSWORD" secure onChange={(text) => setPassword(text)} />
        <Spacer.Large />
        <Button.Primary
          width={240}
          title="Ingresar"
          onPress={handleSignIn}
          disabled={signingIn}
        />
      </Container>
      <Container>
        <Button.Tertiary
          title="Reset password"
          onPress={handleForgot}
          disabled={signingIn}
        />
      </Container>
      <Container>
        <Button.Tertiary
          title="Nuevo usuario? Registrate"
          onPress={() => navigation.navigate("Onboarding/SignUp")}
          disabled={signingIn}
        />
        <Spacer.Medium />
      </Container>
    </Container>
  );
};

export default SignIn;
