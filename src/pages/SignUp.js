import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../styles/colors";
import Input from "../components/auth/Input";
import Button from "../components/Button";

export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>chatConnect</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="e-postanızı giriniz.."
            keyboardType="email-address"
          />
          <Input placeholder="şifrenizi giriniz.." secureTextEntry={true} />
          <Input
            placeholder="şifrenizi tekrar giriniz.."
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={"Kayıt Ol"} />
          <Button
            theme="secondary"
            text={"Geri"}
            onPress={() => navigation.navigate("SignInScreen")}
          />
        </View>
      </View>
    </View>
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
