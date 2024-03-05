import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const CommentModal = ({ isVisible, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View className="bottom-0 absolute bg-gray-200 h-[20%] w-full rounded-t-3xl p-4">
        <View className="flex flex-row">
          <TextInput
            className="flex-1"
            editable
            multiline
            numberOfLines={4}
            maxLength={150}
            placeholder="Yorum..."
            onChangeText={(text) => setComment(text)}
            value={comment}
            style={{ textAlignVertical: "top" }}
          />
          <Pressable onPress={onClose}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            onSubmit(comment);
            onClose();
          }}
          className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center self-end"
        >
          <AntDesign name="arrowup" size={24} color="white" />
        </Pressable>
      </View>
    </Modal>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "gray",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: "100%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
  },
});
