import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const SearchScreen = () => {
  return (
    <SafeAreaView className="bg-white flex flex-1 space-y-2 p-3">

      {/* Search Bar */}
      <View className="flex flex-row gap-1 p-1 rounded-md border border-gray-500 overflow-hidden">
        <EvilIcons name="search" size={32} color="gray" />
        <TextInput className="flex flex-1" placeholder='Search' />
      </View>

      <ScrollView className="flex">

      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})