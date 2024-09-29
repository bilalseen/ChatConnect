import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import FloatingActionButton from "../components/FloatingActionButton";
import RoomCard from "../components/RoomCard";
import { getDatabase, onValue, ref } from "firebase/database";
import parseData from "../utils/parseData";
import RoomCreationModal from "../components/RoomCreationModal";

export default function Home() {
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
            console.log(formattedData);
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
          renderItem={(item) => <RoomCard roomData={item.item} />}
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
