import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../styles/colors";
import Input from "../components/auth/Input";
import Button from "../components/Button";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { getFirebaseErrorMessage } from "../utils/firebaseAuthError";
import { Formik } from "formik";
import * as yup from "yup";

export default function SignIn({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("Kullanıcı oturumu açık:", user);
      } else {
        console.log("Kullanıcı oturumu kapalı");
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      showMessage({
        message: "Success",
        description: "Sign in successful",
        type: "success",
      });
      setUser(userCredential.user);
    } catch (error) {
      showMessage({
        message: "Error",
        description: getFirebaseErrorMessage(error),
        type: "danger",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address!!!")
      .required("Email is required!!!"),
    password: yup
      .string()
      .required("Password is required!!!")
      .min(6, "Password must be at least 6 characters long!!!"),
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
                placeholder="Enter your email.."
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email && errors.email}
              />
              <Input
                placeholder="Enter your password.."
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={touched.password && errors.password}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text={"Sign In"}
                onPress={handleSubmit}
                loading={loading}
              />
              <Button
                theme="secondary"
                text={"Sign Up"}
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
