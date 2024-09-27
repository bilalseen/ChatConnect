import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors";

const RoomCard = ({ roomName, roomID, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{roomName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 175,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dotted",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.secondary,
  },
});

export default RoomCard;
