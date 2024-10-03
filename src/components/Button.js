import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../styles/colors";

export default function Button({ text, onPress, theme = "primary", loading }) {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles[theme].buttonText}>
        {loading ? "Loading..." : text}
      </Text>
    </TouchableOpacity>
  );
}

const buttonBaseStyle = {
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 18,
  },
};

const styles = {
  primary: StyleSheet.create({
    ...buttonBaseStyle,
    container: {
      ...buttonBaseStyle.container,
      backgroundColor: colors.secondary,
    },
    buttonText: {
      ...buttonBaseStyle.buttonText,
      color: colors.tertiary,
    },
  }),
  secondary: StyleSheet.create({
    ...buttonBaseStyle,
    container: {
      ...buttonBaseStyle.container,
      backgroundColor: colors.tertiary,
    },
    buttonText: {
      ...buttonBaseStyle.buttonText,
      color: colors.secondary,
    },
  }),
};
