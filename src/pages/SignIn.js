import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import colors from "../styles/colors";
import Input from "../components/auth/Input";
import Button from "../components/Button";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { getFirebaseErrorMessage } from "../utils/firebaseAuthError";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState({});

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      showMessage({
        message: "Başarılı",
        description: "Giriş Başarılı",
        type: "success",
      });
      setUser(userCredential.user);
      setEmail(null);
      setPassword(null);
      console.log(user);
    } catch (error) {
      showMessage({
        message: "Hata",
        description: getFirebaseErrorMessage(error),
        type: "danger",
      });
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
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="şifrenizi giriniz.."
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={"Giriş Yap"} onPress={signIn} />
          <Button
            theme="secondary"
            text={"Kayıt Ol"}
            onPress={() => navigation.navigate("SignUpScreen")}
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
