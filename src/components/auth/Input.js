import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import colors from "../../styles/colors";

export default function Input({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  onBlur,
  error,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        value={value}
        placeholderTextColor={colors.tertiary}
        style={[styles.input, error && styles.inputError]}
        autoCapitalize="none"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderColor: colors.tertiary,
    borderBottomWidth: 1,
    padding: 10,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
});
