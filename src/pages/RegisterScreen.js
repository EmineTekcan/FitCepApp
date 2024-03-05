import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../../config/FirebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            console.log("Kullanıcı profil güncellendi");
          })
          .catch((error) => {
            console.error(
              "Kullanıcı profil güncellenirken bir hata oluştu:",
              error
            );
          });

        setDoc(doc(firestore, "users", user.uid), {
          uid: user.uid,
          fullName: fullName,
          username: username,
          email: email,
          following:0,
          followers:0
        })
          .then(() => {
            console.log("Kullanıcı bilgileri Firestore'a başarıyla kaydedildi");
          })
          .catch((error) => {
            console.error(
              "Firestore'a kayıt sırasında bir hata oluştu:",
              error
            );
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          "Kullanıcı kaydı sırasında bir hata oluştu:",
          errorCode,
          errorMessage
        );
      });
  };

  const navigateToLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View className="flex flex-1 items-center justify-center p-8 bg-bg-color space-y-5">
      <Pressable onPress={navigateToLogin} className="absolute left-6 top-10">
        <SimpleLineIcons
          name="arrow-left-circle"
          size={32}
          className="bg-main-color"
        />
      </Pressable>
      <Text className="text-3xl text-main-color my-8">Kullanıcı Kayıt</Text>

      <View className="w-full flex">
        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Pressable
        onPress={handleRegister}
        className="h-12 w-[80%] rounded-xl bg-main-color flex items-center justify-center"
      >
        <Text className="text-white font-semibold text-lg">Kayıt ol</Text>
      </Pressable>
      <Pressable
        onPress={navigateToLogin}
        className="h-12 w-[80%] rounded-xl bg-second-color flex items-center justify-center"
      >
        <Text className="text-white font-semibold text-lg">Giriş yap</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: "#396EB0",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
    justifyContent: "center",
  },
});

export default RegisterScreen;
