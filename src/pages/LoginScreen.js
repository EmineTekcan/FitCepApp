import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('BottomNavigation');
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("RegisterScreen")
  }

  return (
    <View className="bg-bg-color flex items-center justify-center flex-auto p-8 space-y-5">

      <Pressable onPress={navigateToRegister} className="absolute left-6 top-20">
        <SimpleLineIcons name="arrow-left-circle" size={32} className="bg-main-color" />
      </Pressable>

      <Text className="text-3xl text-main-color my-8">Hoş Geldiniz!</Text>
      <View style={styles.inputContainer}>
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
      <Pressable onPress={handleLogin} className="h-12 w-[80%] rounded-xl bg-second-color flex items-center justify-center">
        <Text className="text-white font-semibold text-lg">Giriş yap</Text>
      </Pressable>
      <Pressable onPress={navigateToRegister} className="h-12 w-[80%] rounded-xl bg-main-color flex items-center justify-center">
        <Text className="text-white font-semibold text-lg">Kayıt ol</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({

  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#396EB0',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
    justifyContent: 'center',
  },
});

export default LoginScreen;
