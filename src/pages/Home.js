import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
