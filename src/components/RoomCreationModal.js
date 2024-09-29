import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Button from "../components/Button";
import { auth, database } from "../services/firebaseConfig";
import { push, ref, set } from "firebase/database";

const CustomModal = ({ modalVisible, setIsModalVisible }) => {
  const [roomName, setRoomName] = useState("");

  const createRoom = () => {
    const db = database;
    const roomRef = ref(db, "rooms/");
    const newRoomRef = push(roomRef);
    set(newRoomRef, {
      roomID: newRoomRef.key,
      roomName: roomName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: auth.currentUser.email,
      roomInfo: {
        description: roomName + " odası",
        owner: auth.currentUser.email,
        imageUrl: "https://example.com/default-room-image.png",
        privacy: "public",
        category: "Teknoloji",
        maxParticipants: 50,
      },
      participants: [auth.currentUser.email],
    })
      .then(() => {
        console.log("Oda oluşturuldu");
        setIsModalVisible(false);
        setRoomName("");
      })
      .catch((error) => {
        showMessage({
          message: "Oda oluşturulurken bir hata oluştu",
          type: "warning",
        });
        console.error("Oda oluşturma hatası:", error);
      });
  };
  return (
    <View>
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.3}
        onSwipeComplete={() => {
          setIsModalVisible(false);
          setRoomName("");
        }}
        onBackdropPress={() => {
          setIsModalVisible(false);
          setRoomName("");
        }}
        swipeDirection={["down"]}
        avoidKeyboard={true}
        style={styles.modalContainer}
      >
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <TextInput
              placeholder="Oda Adı"
              style={styles.input}
              onChangeText={(text) => setRoomName(text)}
              value={roomName}
            />
            <Button
              text="Oda Oluştur"
              onPress={() => {
                if (roomName.trim() === "") {
                  Alert.alert("Hata", "Oda adı boş olamaz!");
                } else {
                  createRoom();
                }
              }}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    position: "absolute",
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
  },
  scrollView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  input: {
    width: "100%",
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default CustomModal;
