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
import { Formik } from "formik";
import * as yup from "yup";

export default function SignIn({ navigation }) {
  const [user, setUser] = useState({});

  const signIn = async (email, password) => {
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
    } catch (error) {
      showMessage({
        message: "Hata",
        description: getFirebaseErrorMessage(error),
        type: "danger",
      });
      console.log(error);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Geçersiz e-posta!!!")
      .required("E-posta zorunlu!!!"),
    password: yup
      .string()
      .required("Şifre zorunlu!!!")
      .min(6, "Şifre en az 6 karakter olmalıdır!!!"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>chatConnect</Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => signIn(values.email, values.password)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="e-postanızı giriniz.."
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email && errors.email}
              />
              <Input
                placeholder="şifrenizi giriniz.."
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={touched.password && errors.password}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button text={"Giriş Yap"} onPress={handleSubmit} />
              <Button
                theme="secondary"
                text={"Kayıt Ol"}
                onPress={() => navigation.navigate("SignUpScreen")}
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
