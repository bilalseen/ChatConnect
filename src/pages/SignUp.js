import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import colors from "../styles/colors";
import Input from "../components/auth/Input";
import Button from "../components/Button";
import { app, auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);
  const [user, setUser] = useState({});

  const signUp = async () => {
    if (password != passwordRepeat)
      return console.log("Passwords do not match");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setEmail(null);
      setPassword(null);
      setPasswordRepeat(null);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>chatConnect</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="e-postanızı giriniz.."
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="şifrenizi giriniz.."
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="şifrenizi tekrar giriniz.."
            secureTextEntry={true}
            onChangeText={(text) => setPasswordRepeat(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={"Kayıt Ol"} onPress={signUp} />
          <Button
            theme="secondary"
            text={"Geri"}
            onPress={() => navigation.navigate("SignInScreen")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: colors.tertiary,
    fontSize: 26,
    fontWeight: "600",
  },
  formContainer: {
    flex: 1,
    gap: 50,
  },
  inputContainer: {
    gap: 20,
  },
  buttonContainer: {
    gap: 20,
  },
});
