import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import colors from "../../styles/colors";

export default function Input({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  handleBlur,
}) {
  return (
    <TextInput
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onBlur={handleBlur}
      value={value}
      placeholderTextColor={colors.tertiary}
      style={styles.container}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: colors.tertiary,
    borderBottomWidth: 1,
    placeholderTextColor: colors.tertiary,
    padding: 10,
  },
});
