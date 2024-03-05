
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { TextInput } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const MessageScreen = () => {
  const navigation = useNavigation();
  const message =
    "Merhaba emine nasılsın tez projesini yaptın mı? Hocaya göstericek neler var elimizde?";

  return (
    <SafeAreaView className="flex flex-1 p-3 bg-white space-y-3">
      {/* Search Bar */}
      <View className="flex flex-row gap-1 p-1 rounded-md border border-gray-500 overflow-hidden">
        <EvilIcons name="search" size={32} color="gray" />
        <TextInput className="flex flex-1" placeholder="Search" />
      </View>

      <Text className="text-base py-1 font-semibold">Mesajlar</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.navigate("Chat")}
          className="w-[100%] h-20 flex flex-row space-x-3 items-center"
        >
          <View className="w-[15%] h-20 flex items-center justify-center">
            <Image
              alt="Profile image"
              source={require("../images/profile.jpg")}
              className="w-[65%] h-full rounded-full"
            />
          </View>
          <View className="flex w-[85%] flex-row items-center justify-between border-b  border-gray-300">
            <View className=" flex-col w-[79%] h-full justify-evenly">
              <Text className="font-semibold">Kübra Ermeydan</Text>
              <View className="flex flex-row space-x-0 items-center">
                <Text className="h-5">
                  {" "}
                  {message.length > 30
                    ? `${message.substring(0, 30)}...`
                    : message}
                </Text>
              </View>
            </View>
            <Text className="h-full">Bugün</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageScreen;
