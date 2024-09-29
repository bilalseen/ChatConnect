import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import colors from "../styles/colors";

import { onValue, ref } from "firebase/database";
import { database } from "../services/firebaseConfig";

import parseData from "../utils/parseData";

export default function Room({ route }) {
  const { roomId } = route.params;
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const getRoomDetails = () => {
      const db = database;
      const roomsRef = ref(db, "rooms/" + roomId);

      const unsubscribe = onValue(
        roomsRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setRoomData(data);
          } else {
            console.error("Veri bulunamadı");
            setRoomData(null);
          }
        },
        (error) => {
          console.error("Veri çekme hatası:", error);
        }
      );

      return unsubscribe;
    };

    const unsubscribe = getRoomDetails();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/roomBackground/light.png")}
        style={{ position: "absolute", flex: 1, width: "100%", height: "100%" }}
      />
      {roomData ? (
        <Text
          style={{ color: colors.primary, fontSize: 20, fontWeight: "600" }}
        >
          {roomData.roomName} Oda
        </Text>
      ) : (
        <Text
          style={{ color: colors.primary, fontSize: 20, fontWeight: "600" }}
        >
          Oda Bulunamadı
        </Text>
      )}
    </View>
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
