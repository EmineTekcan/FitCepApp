import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { getFollowersList, unfollowUser } from "../services/firebase/Follow";
import { useNavigation } from "@react-navigation/native";

const FollowerListModal = ({ visible, onClose, authUserId }) => {
  const [followersList, setFollowersList] = useState([]);

  const getFollowersUsers = async () => {
    const users = await getFollowersList(authUserId);
    setFollowersList(users);
    console.log(users);
  };

  useEffect(() => {
    getFollowersUsers();
  }, [authUserId]);

  const unfollowUserFromList = async (unfollowUserId) => {
    await unfollowUser(authUserId, unfollowUserId);
    getFollowersUsers();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <TouchableOpacity
          className="border-gray-400 border-0.5 rounded-md"
          onPress={onClose}
          style={styles.closeButton}
        >
          <AntDesign name="close" size={24} color={"gray"} />
        </TouchableOpacity>
        <Text className="text-center text-base font-medium">Takipçiler</Text>

        <ScrollView className="w-full">
          {followersList.map((item, index) => (
            <View
              key={index}
              className="flex flex-row w-full items-center space-x-3"
            >
              <Image
                className="rounded-full"
                width={60}
                height={60}
                source={{ uri: item.profilePicture }}
              />
              <View className="flex flex-1 flex-row items-center justify-between">
                <Text className="text-base font-semibold">{item.name}</Text>
                <Pressable
                  onPress={() => unfollowUserFromList(item.id)}
                  className="border-0.5 border-gray p-2 rounded-xl"
                >
                  <Text>Takipçiyi sil</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FollowerListModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    height: "60%",
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
    resizeMode: "cover",
  },
  modalText: {},
  closeButton: {
    alignSelf: "flex-end",
  },
});
