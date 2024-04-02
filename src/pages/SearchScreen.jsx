import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { searchUsersByFullName } from "../services/firebase/Search";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);

  const navigation = useNavigation();

  const searchUser = async () => {
    const users = await searchUsersByFullName(text);
    setUsers(users);
  };

  return (
    <SafeAreaView className="bg-white flex flex-1 space-y-2 p-3">
      {/* Search Bar */}
      <View className="flex flex-row gap-1 p-1 rounded-md border border-gray-500 overflow-hidden">
        <TextInput
          onChangeText={setText}
          value={text}
          className="flex flex-1"
          placeholder="Search"
        />
        <Pressable onPress={searchUser}>
          <EvilIcons name="search" size={32} color="gray" />
        </Pressable>
      </View>

      <ScrollView className="flex">
        {users &&
          users.map((item, index) => (
            <Pressable
              className="flex flex-row space-x-2 items-center"
              key={index}
              onPress={() => navigation.navigate("UserScreen", { person: item })}
            >
              {
                item.profilePicture !== undefined ?
                <Image
                source={{ uri: item.profilePicture }}
                className="w-16 h-16 rounded-full"
              />:
              <Image
                source={require("../images/pp.png")}
                className="w-16 h-16 rounded-full"
              />
              }
              <View className="flex flex-col space-y-1">
                <Text className="text-base font-semibold">{item.fullName}</Text>
                <Text>{item.username}</Text>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
