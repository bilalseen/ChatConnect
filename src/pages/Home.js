import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import RoomCard from "../components/RoomCard";
import RoomCreationModal from "../components/RoomCreationModal";
import FloatingActionButton from "../components/FloatingActionButton";

import { getDatabase, onValue, ref } from "firebase/database";
import parseData from "../utils/parseData";

export default function Home({ navigation }) {
  const [roomData, setRoomData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getRooms = () => {
      const db = getDatabase();
      const roomsRef = ref(db, "rooms");

      const unsubscribe = onValue(
        roomsRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const formattedData = parseData(data);
            setRoomData(formattedData);
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

    const unsubscribe = getRooms();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleNavigate = (roomId) => {
    navigation.navigate("RoomScreen", { roomId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <FloatingActionButton
        onPress={() => setIsModalVisible(!isModalVisible)}
      />
      <RoomCreationModal
        modalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      {roomData ? (
        <FlatList
          numColumns={2}
          data={roomData}
          renderItem={(item) => (
            <RoomCard
              roomData={item.item}
              onPress={() => handleNavigate(item.item.roomId)}
            />
          )}
          keyExtractor={(item) => item.roomId}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 50 }} />}
          ListHeaderComponent={<View style={{ height: 50 }} />}
        />
      ) : (
        <Text>Oda bulunamadı</Text>
      )}
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
