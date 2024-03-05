import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/HomeScreen";
import NotificationScreen from "../pages/NotificationScreen";
import PostScreen from "../pages/PostScreen";
import ProfileScreen from "../pages/ProfileScreen";
import ProgressScreen from "../pages/ProgressScreen";

import { Text, View, Pressable } from "react-native";
import { colors } from "../utils/consts";
import { Octicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const navigation = useNavigation();

  const navigateToPostScreen = () => {
    navigation.navigate("PostScreen");
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Foundation
                name="home"
                size={30}
                color={colors["bottom-icon-color"]}
              />
            ) : (
              <Octicons name="home" size={22} color={color} />
            ),
          title: "Logo",
          headerRight: () => (
            <View className="pr-3 flex flex-row gap-4">
              <EvilIcons
                onPress={() => navigation.navigate("SearchScreen")}
                name="search"
                size={32}
                color="black"
              />
              <Pressable onPress={() => navigation.navigate("MessagesScreen")}>
                <AntDesign name="message1" size={24} color="black" />
                <View className="bg-[#FF7511] flex p-1 rounded-full absolute -right-2 -top-2">
                  <Text className="text-[10px] text-white">12</Text>
                </View>
              </Pressable>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProgressScreen"
        component={ProgressScreen}
        options={{
          title: "Progress",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons
                name="pie-chart"
                size={28}
                color={colors["bottom-icon-color"]}
              />
            ) : (
              <Ionicons name="pie-chart-outline" size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          tabBarIcon: () => (
            <Pressable
              onPress={navigateToPostScreen}
              style={{
                backgroundColor: "white",
                padding: 6,
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOpacity: 0.8,
                shadowOffset: { width: 5, height: 3 },
                shadowRadius: 10,
                elevation: 5,
                marginBottom: 40,
              }}
            >
              <View
                style={{
                  backgroundColor: colors["bottom-icon-color"],
                  width: 48,
                  height: 48,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                }}
              >
                <Ionicons name="add" size={30} color="white" />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: "Notification",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <FontAwesome
                name="bell"
                size={24}
                color={colors["bottom-icon-color"]}
              />
            ) : (
              <FontAwesome name="bell-o" size={22} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("SettingsScreen")}
              className="pr-3"
            >
              <Feather name="menu" size={28} color="white" />
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: colors["bottom-icon-color"],
          },
          headerTitleStyle: {
            color: "white",
          },
          title: "Profile",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons
                name="person"
                size={28}
                color={colors["bottom-icon-color"]}
              />
            ) : (
              <Ionicons name="person-outline" size={24} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
