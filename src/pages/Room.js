import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

import colors from "../styles/colors";

import { onValue, ref } from "firebase/database";
import { database } from "../services/firebaseConfig";

import parseData from "../utils/parseData";
import MessageCard from "../components/chat/MessageCard";
import MessageInput from "../components/chat/MessageInput";

export default function Room({ route }) {
  const { roomId } = route.params;
  const [roomData, setRoomData] = useState([]);
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef();

  useEffect(() => {
    const getRoomDetails = () => {
      const roomsRef = ref(database, "rooms/" + roomId);

      const unsubscribeRoom = onValue(
        roomsRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setRoomData(data);
          } else {
            setRoomData(null);
          }
        },
        (error) => {
          console.error("Veri çekme hatası:", error);
        }
      );

      const messagesRef = ref(database, `rooms/${roomId}/messages`);

      const unsubscribeMessages = onValue(
        messagesRef,
        (snapshot) => {
          const messagesData = snapshot.val();
          if (messagesData) {
            const parsedMessages = parseData(messagesData);
            setMessages(parsedMessages);
          } else {
            setMessages([]);
          }
        },
        (error) => {
          console.error("Mesaj verileri çekme hatası:", error);
        }
      );

      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      };
    };

    const unsubscribe = getRoomDetails();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({
        animated: true,
      });
    }
  }, [messages]);

  if (!roomData) {
    return (
      <View style={styles.container}>
        <Text>Bu oda bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/roomBackground/light.png")}
        style={{ position: "absolute", flex: 1, width: "100%", height: "100%" }}
      />
      <MessageInput roomId={roomData.roomID} />
      {roomData ? (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          style={{ padding: 10, marginBottom: 65 }}
          ListHeaderComponent={
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  padding: 10,
                  borderRadius: 10,
                  color: "#fff",
                  backgroundColor: colors.primary,
                  width: "50%",
                }}
              >
                {roomData?.roomName} odasına hoş geldiniz
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: colors.secondary }}>
                Henüz bu odada mesaj yok.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <MessageCard
              item={item}
              profileImage={
                "https://pbs.twimg.com/profile_images/1838282585098592256/vgzeECiU_400x400.jpg"
              }
            />
          )}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: colors.secondary }}>Bu oda bulunamadı.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
