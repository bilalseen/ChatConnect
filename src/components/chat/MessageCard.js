import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { parseTimeStamp } from "../../utils/parseTimeStamp";
import { auth } from "../../services/firebaseConfig";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../../styles/colors";

const ProfileImage = ({ profileImage }) => {
  return profileImage ? (
    <Image source={{ uri: profileImage }} style={styles.profileImage} />
  ) : (
    <View style={styles.defaultProfileContainer}>
      <FontAwesome name="user" size={10} color="#e1e1e1" />
    </View>
  );
};

const MessageCard = ({ item }) => {
  const isSentByCurrentUser = item.user === auth.currentUser.email;

  return (
    <View
      style={[
        styles.messageWrapper,
        isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <View style={styles.messageContainer}>
        {!isSentByCurrentUser && (
          <ProfileImage profileImage={item.profileImage} />
        )}
        <View style={styles.messageContentWrapper}>
          {!isSentByCurrentUser && (
            <Text style={styles.usernameText}>〜 {item.user}</Text>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
          <Text style={styles.messageTime}>{parseTimeStamp(item.time)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    marginVertical: 5,
  },
  sentMessage: {
    alignItems: "flex-end",
  },
  receivedMessage: {
    alignItems: "flex-start",
  },
  messageContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  messageContentWrapper: {
    gap: 5,
    maxWidth: "75%",
    minWidth: "30%",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
    backgroundColor: "#6A5BC2",
    padding: 10,
    borderRadius: 10,
  },
  usernameText: {
    color: colors.secondary,
    fontSize: 10,
  },
  messageText: {
    color: "#fff",
  },
  messageTime: {
    color: colors.secondary,
    fontSize: 10,
    textAlign: "right",
    paddingRight: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  defaultProfileContainer: {
    backgroundColor: "#b3b3b3",
    borderRadius: 100,
    padding: 5,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessageCard;
