import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  ref as sRef,
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { postGonderi } from "../services/firebase/Post";
import { useNavigation } from "@react-navigation/native";

const PostScreen = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function getUserPhotoUrl(userId) {
    const storage = getStorage();
    const photoRef = sRef(storage, `userProfilePictures/${userId}.jpg`);
    try {
      const url = await getDownloadURL(photoRef);
      setPhotoUrl(url);
    } catch (error) {
      setPhotoUrl(null);
      console.log("Fotoğraf getirilirken bir hata oluştu:", error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserPhotoUrl(user.uid);
        setUserId(user.uid);
        setEmail(user.email);
        setDisplayName(user.displayName);
      } else {
        console.log("kullanıcı bulunamadı");
      }
    });
  }, [userId]);

  const uploadImage = async (uri, path) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = sRef(storage, path);
    const uploadResult = await uploadBytes(storageRef, blob);
    return await getDownloadURL(uploadResult.ref);
  };

  const createPost = async () => {
    if (image && description) {
      const imagePath = `postImages/${userId}_${new Date().toISOString()}.jpg`;
      const uploadedImageUrl = await uploadImage(image, imagePath);
      postGonderi(userId, description, uploadedImageUrl);
    } else {
      console.log("Fotograf veya açıklama yazılmadı")
    }
    navigation.navigate("HomeScreen");
  };

  return (
    <View className="flex flex-1 bg-white">
      <View className="border m-2 rounded-md border-gray-600 flex p-2">
        <View className="flex flex-row gap-2">
          {photoUrl !== null ? (
            <Image
              className="rounded-full mb-2"
              source={{ uri: photoUrl }}
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <Image
              className="rounded-full mb-2"
              source={require("../images/pp.png")}
              style={{ width: 50, height: 50 }}
            />
          )}
          <View>
            <Text className="text-lg font-semibold">{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        <TextInput
          editable
          multiline
          numberOfLines={5}
          maxLength={150}
          placeholder="Açıklama..."
          onChangeText={(text) => setDescription(text)}
          value={description}
          style={{ textAlignVertical: "top" }}
        />
      </View>

      <Pressable onPress={pickImage} className="w-full h-[50%] p-2">
        <View className="border border-gray-600 rounded-md w-full h-full flex flex-1 justify-center items-center">
          {!image && <FontAwesome name="photo" size={28} color="gray" />}
          {image && <Image source={{ uri: image }} className="h-full w-full" />}
        </View>
      </Pressable>

      <Pressable
        onPress={createPost}
        className="bg-orange-500 w-[30%] p-2 rounded-full self-center"
      >
        <Text className="text-white text-base text-center">Gönderi</Text>
      </Pressable>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({});
