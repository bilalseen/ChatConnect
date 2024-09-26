import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import colors from "../styles/colors";
import Input from "../components/auth/Input";
import Button from "../components/Button";
import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { getFirebaseErrorMessage } from "../utils/firebaseAuthError";
import { showMessage } from "react-native-flash-message";
import { Formik } from "formik";

export default function SignUp({ navigation }) {
  const signUp = async (email, password, passwordRepeat) => {
    if (password !== passwordRepeat) {
      return showMessage({
        message: "Hata",
        description: "Şifreler uyuşmuyor",
        type: "warning",
      });
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      showMessage({
        message: "Başarılı",
        description: "Kayıt Başarılı",
        type: "success",
      });
      console.log(userCredential.user); // userCredential.user kullan
    } catch (error) {
      console.log(error.code);
      showMessage({
        message: "Başarısız",
        description: getFirebaseErrorMessage(error),
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>chatConnect</Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "", passwordRepeat: "" }}
        onSubmit={(values) =>
          signUp(values.email, values.password, values.passwordRepeat)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="e-postanızı giriniz.."
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
              />
              <Input
                placeholder="şifrenizi giriniz.."
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
              />
              <Input
                placeholder="şifrenizi tekrar giriniz.."
                secureTextEntry={true}
                onChangeText={handleChange("passwordRepeat")}
                value={values.passwordRepeat}
                onBlur={handleBlur("passwordRepeat")}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button text={"Kayıt Ol"} onPress={handleSubmit} />
              <Button
                theme="secondary"
                text={"Geri"}
                onPress={() => navigation.navigate("SignInScreen")}
              />
            </View>
          </View>
        )}
      </Formik>
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
