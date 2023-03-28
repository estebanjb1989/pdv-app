import React, { useState } from "react";
import { Image } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { Button, Container, Text, Input, Spacer } from "../../../component";
import { useHeaderHidden } from "../../../hook";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Config from "../../../constants/Config";
import LogoWideAsset from "../../../assets/logo-wide.png";

const SignIn = () => {
  useHeaderHidden();
  const [email, setEmail] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email?.length) {
      alert("Email invalido");
      return;
    }

    if (!password1?.length) {
      alert("Debe ingresar su password");
      return;
    }

    if (!password2?.length) {
      alert("Debe reiterar su password");
      return;
    }

    if (password1 !== password2) {
      alert("Password no coincide");
      return;
    }

    try {
      const auth = getAuth();
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      );
      await sendEmailVerification(credentials.user);
      alert(
        "Te has registrado en " +
          Config.appName +
          "! Por favor verifica tu email para ingresar"
      );
      navigation.navigate("Onboarding/SignIn");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container flex alignCenter spaceBetween>
      <Container />
      <Container>
        <Image
          source={LogoWideAsset}
          style={{
            width: 250,
            height: 80,
          }}
        />
      </Container>
      <Container>
        <Input
          label="EMAIL"
          autoFocus
          placeholder="user@email.com"
          onChange={(text) => setEmail(text)}
        />

        <Input
          label="PASSWORD"
          secure
          onChange={(text) => setPassword1(text)}
        />

        <Input
          label="CONFIRMAR PASSWORD"
          secure
          onChange={(text) => setPassword2(text)}
        />
        <Spacer.Large />
        <Button.Primary
          width={240}
          title="Registrarse"
          onPress={handleSignUp}
        />
      </Container>
      <Container>
        <Button.Tertiary
          title="Ya estas registrado? Ingresar"
          onPress={() => navigation.navigate("Onboarding/SignIn")}
        />
        <Spacer.Medium />
      </Container>
    </Container>
  );
};

export default SignIn;
