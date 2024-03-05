import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';

const SettingsItem = ({ iconComponent, text, onPress }) => {
    return (
        <Pressable onPress={onPress} className="flex flex-row justify-between h-12 items-center rounded-md px-1 ">
            <View className="flex flex-row items-center space-x-2">
                {iconComponent}
                <Text>{text}</Text>
            </View>
            <Feather name="chevron-right" size={24} color="black" />
        </Pressable>
    )
}

export default SettingsItem