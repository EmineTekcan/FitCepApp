import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SettingsItem from '../components/SettingsItem';

const icons = [
  <Ionicons name="person-outline" size={28} color="black" />,
  <Ionicons name="notifications-outline" size={28} color="black" />,
  <SimpleLineIcons name="lock" size={26} color="black" />,
  <Ionicons name="help-buoy-outline" size={28} color="black" />,
  <SimpleLineIcons name="exclamation" size={26} color="black" />,
  <AntDesign name="logout" size={28} color="black" />
]

const SettingsScreen = () => {

  const navigation = useNavigation();

  const handleSignOut = async () => {
    signOut(auth).then(() => {
      console.log("çıkış yapıldı")
      navigation.navigate("LoginScreen")
    }).catch((error) => {
      console.log(error.message)
    });
  };

  const handleNavigate = (pageName) => {
    navigation.navigate(pageName)
  }

  return (
    <ScrollView className="px-4 bg-white flex flex-col space-y-2">
      <SettingsItem iconComponent={<Ionicons name="person-outline" size={28} color="black" />} text="Profil" onPress={()=> handleNavigate("ProfileEditScreen")}/>
      <SettingsItem iconComponent={<Ionicons name="notifications-outline" size={28} color="black" />} text="Bildirimler" onPress={()=> handleNavigate("NotificationSettingsScreen")}/>
      <SettingsItem iconComponent={<SimpleLineIcons name="lock" size={26} color="black" />} text="Şifre ve güvenlik" onPress={()=> handleNavigate("AccountSecurityScreen")}/>
      <SettingsItem iconComponent={<Ionicons name="help-buoy-outline" size={28} color="black" />} text="Yardım" onPress={()=> handleNavigate("HelpScreen")}/>
      <SettingsItem iconComponent={<SimpleLineIcons name="exclamation" size={26} color="black" />} text="Hakkında" onPress={()=> handleNavigate("AboutScreen")} />
      <SettingsItem iconComponent={<AntDesign name="logout" size={28} color="black" />} text="Çıkış yap" onPress={handleSignOut} />
    </ScrollView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})