import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../styles/colors";

export default function FloatingActionButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AntDesign name="plus" size={24} color={colors.tertiary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    padding: 20,
    borderRadius: 50,
    zIndex: 1,
  },
});
