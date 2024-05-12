import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

const PostModal = ({ visible, onClose, post, fullName, profilePicture }) => {
  const formatDate = (firebaseTimestamp) => {
    const date = firebaseTimestamp.toDate();
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex flex-row self-start items-center space-x-2 mb-2">
          <Image
            source={{ uri: profilePicture }}
            className="w-12 h-12 rounded-full"
          />
          <Text className="font-semibold text-base">{fullName}</Text>
        </View>

        {post && (
          <View className="flex flex-col space-y-2">
            <Text>{formatDate(post.createdAt)}</Text>
            <Text style={styles.modalText}>{post.description}</Text>
            <Image source={{ uri: post.photoUrl }} style={styles.modalImage} />
            <View className="flex flex-row space-x-2">
              <View className="flex flex-row space-x-1">
                <Octicons name="heart" size={20} color={"black"} />
                <Text>{post.likes}</Text>
              </View>
              <View className="flex flex-row space-x-1">
                <MaterialCommunityIcons
                  name="comment-processing-outline"
                  size={22}
                  color="black"
                />
                <Text>{post.commentCount}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default PostModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
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
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  modalText: {},
  closeButton: {
    alignSelf: "flex-end",
  },
});
