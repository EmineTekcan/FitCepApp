import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from "./colors";
import { Entypo } from '@expo/vector-icons';
import MessageScreen from "./MessageScreen";
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";


const MessagesScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
        <MessageScreen />
            <TouchableOpacity
                onPress={() => navigation.navigate("MessageScreen")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
    );
    };

    export default MessagesScreen;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    });











// import { Dimensions, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native";
// import { TextInput } from "react-native";
// import { EvilIcons } from "@expo/vector-icons";
// import { ScrollView } from "react-native-gesture-handler";
// import { Image } from "react-native";
// import { Pressable } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");
// const MessagesScreen = () => {
//   const navigation = useNavigation();
//   const message =
//     "Merhaba emine nasılsın tez projesini yaptın mı? Hocaya göstericek neler var elimizde?";

//   return (
//     <SafeAreaView className="flex flex-1 p-3 bg-white space-y-3">
//       {/* Search Bar */}
//       <View className="flex flex-row gap-1 p-1 rounded-md border border-gray-500 overflow-hidden">
//         <EvilIcons name="search" size={32} color="gray" />
//         <TextInput className="flex flex-1" placeholder="Search" />
//       </View>

//       <Text className="text-base py-1 font-semibold">Mesajlar</Text>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Pressable
//           onPress={() => navigation.navigate("MessageScreen")}
//           className="w-[100%] h-20 flex flex-row space-x-3 items-center"
//         >
//           <View className="w-[15%] h-20 flex items-center justify-center">
//             <Image
//               alt="Profile image"
//               source={require("../images/profile.jpg")}
//               className="w-[65%] h-full rounded-full"
//             />
//           </View>
//           <View className="flex w-[85%] flex-row items-center justify-between border-b  border-gray-300">
//             <View className=" flex-col w-[79%] h-full justify-evenly">
//               <Text className="font-semibold">Kübra Ermeydan</Text>
//               <View className="flex flex-row space-x-0 items-center">
//                 <Text className="h-5">
//                   {" "}
//                   {message.length > 30
//                     ? `${message.substring(0, 30)}...`
//                     : message}
//                 </Text>
//               </View>
//             </View>
//             <Text className="h-full">Bugün</Text>
//           </View>
//         </Pressable>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default MessagesScreen;
