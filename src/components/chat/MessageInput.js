import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";
import { push, set, ref } from "firebase/database";
import { database, auth } from "../../services/firebaseConfig";
import colors from "../../styles/colors";

export default function MessageInput({ roomId }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) {
      showMessage({
        message: "Mesaj boş olamaz",
        type: "warning",
      });
      return;
    }

    const messageRef = ref(database, `rooms/${roomId}/messages`);
    const newMessageRef = push(messageRef);

    const userEmail = auth.currentUser
      ? auth.currentUser.email
      : "Unknown User";

    set(newMessageRef, {
      text: message,
      time: Date.now(),
      user: userEmail,
      username: userEmail.split("@")[0],
    })
      .then(() => {
        console.log("Mesaj gönderildi");
        setMessage("");
      })
      .catch((error) => {
        showMessage({
          message: "An error occurred while sending the message",
          type: "warning",
        });
        console.error("Mesaj gönderme hatası:", error);
      });
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Write a message..."
        placeholderTextColor={colors.secondary}
        onChangeText={(text) => setMessage(text)}
        value={message}
        style={styles.textInput}
      />
      <View style={styles.sendButtonContainer}>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  textInput: {
    flex: 6,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  sendButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    backgroundColor: colors.secondary,
    borderRadius: 100,
  },
});
