import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";
import BottomNavigation from "./BottomNavigation";
import SearchScreen from '../pages/SearchScreen'
import MessagesScreen from "../pages/MessagesScreen";
import MessageScreen from "../pages/MessageScreen";
import SettingsScreen from '../pages/SettingsScreen'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../../config/FirebaseConfig";
import AboutScreen from "../pages/settings/AboutScreen";
import AccountSecurityScreen from "../pages/settings/AccountSecurityScreen";
import HelpScreen from "../pages/settings/HelpScreen";
import NotificationSettingsScreen from "../pages/settings/NotificationSettingsScreen";
import ProfileEditScreen from "../pages/settings/ProfileEditScreen";
import PostScreen from "../pages/PostScreen";
import ToDoScreen from "../utils/ToDoScreen";
import Chat from "../components/Chat";

const Stack = createStackNavigator();

// function ChatStack() {
//   return (
//     <Stack.Navigator defaultScreenOptions={MessagesScreen}>
//       <Stack.Screen name='Home' component={MessagesScreen} />
//       <Stack.Screen name='Chat' component={Chat} />
//     </Stack.Navigator>
//   );
// }


const RootNavigation = () => {
  const [isLogged, setIsLogged] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  return (
    <Stack.Navigator>
      {isLogged ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="BottomNavigation"
            component={BottomNavigation}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
          
          <Stack.Screen
            name="MessagesScreen"
            options={{
              headerTitleStyle: {
                display: "none",
              },
            }}
            component={MessagesScreen}
          />
          <Stack.Screen
            name="MessageScreen"
            component={MessageScreen}
          />
          <Stack.Screen name='Chat' component={Chat} />
          <Stack.Screen
            options={{
              headerTitle: "Ayarlar",
            }}
            name="SettingsScreen"
            component={SettingsScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: "Hakkında",
              headerTitleAlign: "center"
            }}
            name="AboutScreen"
            component={AboutScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: "Şifre ve güvenlik",
              headerTitleAlign: "center"
            }}
            name="AccountSecurityScreen"
            component={AccountSecurityScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: "Yardım",
              headerTitleAlign: "center"
            }}
            name="HelpScreen"
            component={HelpScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: "Bildirimler",
              headerTitleAlign: "center"
            }}
            name="NotificationSettingsScreen"
            component={NotificationSettingsScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: "Profil",
              headerTitleAlign: "center"
            }}
            name="ProfileEditScreen"
            component={ProfileEditScreen}
          />
          <Stack.Screen name="ToDoScreen" component={ToDoScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="RegisterScreen"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="LoginScreen"
            component={LoginScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};


export default RootNavigation;
