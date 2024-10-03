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
import * as yup from "yup";
import { getDatabase, ref, set } from "firebase/database";

export default function SignUp({ navigation }) {
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      showMessage({
        message: "Success",
        description: "Registration Successful",
        type: "success",
      });
      console.log(userCredential.user);
      writeUserData(userCredential.user);
    } catch (error) {
      console.log(error.code);
      showMessage({
        message: "Başarısız",
        description: getFirebaseErrorMessage(error),
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  function writeUserData(user) {
    const db = getDatabase();
    set(ref(db, "users/" + user.uid), {
      username: user.email.split("@")[0],
      email: user.email,
      createdAt: new Date().toISOString(),
    })
      .then(() => {
        console.log("User data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing user data: ", error);
      });
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email address is required."),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match.")
      .required("Password confirmation is required."),
  });

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
                value={values.email}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
              />
              <Input
                placeholder="Enter your password.."
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
              />
              <Input
                placeholder="Re-enter your password.."
                secureTextEntry={true}
                onChangeText={handleChange("passwordRepeat")}
                value={values.passwordRepeat}
                onBlur={handleBlur("passwordRepeat")}
                error={touched.passwordRepeat && errors.passwordRepeat}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text={"Sign Up"}
                onPress={handleSubmit}
                loading={loading}
              />
              <Button
                theme="secondary"
                text={"Back"}
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
