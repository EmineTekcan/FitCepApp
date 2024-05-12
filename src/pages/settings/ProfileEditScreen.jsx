import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  ref as sRef,
  deleteObject,
  ref,
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../../config/FirebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ProfileEditScreen = () => {
  const [userId, setUserId] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri, userId)
        .then(() => {
          console.log("Resim başarıyla yüklendi!");
        })
        .catch((error) => {
          console.error("Resim yüklenirken bir hata oluştu:", error);
        });
    }
  };

  const uploadImage = async (uri, userId) => {
    const fileName = `userProfilePictures/${userId}.jpg`;
    const storage = getStorage();
    const storageRef = ref(storage, fileName); // Kısa yol fonksiyonu `ref` kullanıldı

    // İlk olarak, var olan dosyanın URL'sini almayı dene
    getDownloadURL(storageRef)
      .then(() => {
        // Dosya varsa, önce sil
        deleteObject(storageRef)
          .then(() => {
            // Dosya silindikten sonra yeni dosyayı yükle
            uploadFile(uri, storageRef, userId); // Kullanıcı ID'si ile yükleme fonksiyonunu çağır
          })
          .catch((error) => {
            console.error("Error deleting the old file:", error);
          });
      })
      .catch((error) => {
        // Dosya bulunamazsa direkt yükle
        if (error.code === "storage/object-not-found") {
          uploadFile(uri, storageRef, userId); // Kullanıcı ID'si ile yükleme fonksiyonunu çağır
        } else {
          console.error("Error checking for the file:", error);
        }
      });
  };

  const uploadFile = async (uri, storageRef, userId) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const snapshot = await uploadBytes(storageRef, blob);
      console.log("Uploaded a blob or file!");

      // Dosya başarıyla yüklendikten sonra indirme URL'sini al
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Firestore'da kullanıcı profilini güncelle
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, {
        profilePicture: downloadURL,
      });
      console.log("User profile updated with profile picture URL");

      // Profil fotoğrafı URL'sini state'e güncelle
      setPhotoUrl(downloadURL); // Bu satır eklenmeli
    } catch (error) {
      console.error("Upload failed", error);
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
        getUserDetailsByUid(user.uid);
      } else {
        console.log("kullanıcı bulunamadı");
      }
    });
  }, [userId, photoUrl]);

  const getUserDetailsByUid = async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setEmail(data.email);
        setUsername(data.username);
        setFullName(data.fullName);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri alınırken bir hata oluştu:", error);
      return null;
    }
  };

  const updateProfile = async () => {
    const docRef = doc(firestore, "users", userId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        username: username,
        fullName: fullName,
        email: email,
      }).then(() => {
        console.log("profil basariyla güncellendi");
        navigation.navigate("ProfileScreen");
      });
    } else {
      console.log("No such document!");
    }
  };

  return (
    <View className="flex flex-1">
      <View className="flex h-[35%] items-center justify-center">
        <View>
          {photoUrl !== null ? (
            <Image
              className="rounded-full"
              source={{ uri: photoUrl }}
              style={{ width: 150, height: 150 }}
            />
          ) : (
            <Image
              className="rounded-full"
              source={require("../../../src/images/pp.png")}
              style={{ width: 150, height: 150 }}
            />
          )}

          <Pressable
            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center absolute right-0 bottom-0"
            onPress={pickImage}
          >
            <AntDesign name="edit" size={16} color="white" />
          </Pressable>
        </View>
      </View>
      <View className="w-full h-full px-2">
        <Text className="text-base font-semibold mb-3 text-center">
          Profil Bilgilerinizi Düzenleyin
        </Text>

        <View className="flex flex-col space-y-5">
          <View className="flex flex-col space-y-1">
            <Text className="text-base">Adı Soyadı</Text>
            <TextInput
              className="border-b border-gray-300 py-1 text-base"
              onChangeText={setFullName}
              value={fullName}
            />
          </View>

          <View className="flex flex-col space-y-1">
            <Text className="text-base">E-posta</Text>
            <TextInput
              className="border-b border-gray-300 py-1 text-base"
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View className="flex flex-col space-y-1">
            <Text className="text-base">Kullanıcı Adı</Text>
            <TextInput
              className="border-b border-gray-300 py-1 text-base"
              onChangeText={setUsername}
              value={username}
            />
          </View>

          <Pressable
            onPress={updateProfile}
            className="bg-blue-500 flex flex-row items-center justify-around px-2 py-3 w-[50%] self-center rounded-full"
          >
            <Text className="text-white text-center text-base ">
              Profili Düzenle
            </Text>
            <AntDesign name="right" size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProfileEditScreen;
