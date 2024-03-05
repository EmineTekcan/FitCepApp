import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

export default function App() {
  
  return (
    <NavigationContainer>
        <RootNavigation />
    </NavigationContainer>
  );
}

