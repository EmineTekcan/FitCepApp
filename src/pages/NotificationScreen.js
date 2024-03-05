import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'

const NotificationScreen = () => {

  const comment="Kübra gönderine yorum yaptı: Bugün spor yaptık! Çok eğlenceliydi. Spor yapmak çok dinç hissettiriyor. Bugün spor yaptık! Çok eğlenceliydi. Spor yapmak çok dinç hissettiriyor. Bugün spor yaptık! Çok eğlenceliydi. Spor yapmak çok dinç hissettiriyor. Bugün spor yaptık! Çok eğlenceliydi. Spor yapmak çok dinç hissettiriyor."

  return (
    <SafeAreaView className="bg-white flex-1 p-3">
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-col space-y-3">

        <Text className="text-base font-semibold">Bugün</Text>

        <View className="w-full flex flex-row space-x-3 items-center">
          <Image
            alt='Profile image'
            source={require("../images/profile.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Kübra gönderini beğendi</Text>
              <Text >19dk</Text>
            </View>
            <Image className="w-20 h-20 rounded-l-full" alt='Gönderi fotograf' source={require("../images/spor4.jpg")} />
          </View>
        </View>

        <View className="w-full flex flex-row space-x-3 items-start">
          <Image
            alt='Profile image'
            source={require("../images/kubra.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Kübra seni takip etmeye başladı</Text>
              <Text >1s</Text>
            </View>
          </View>
        </View>

        <View className="w-full flex flex-row space-x-3 items-start">
          <Image
            alt='Profile image'
            source={require("../images/profile.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-start justify-between">
            <View className="flex flex-col flex-shrink h-full justify-stretch">
              <Text className="font-semibold  ">{comment}</Text>
              <Text >19dk</Text>
            </View>
            <Image className="w-20 h-20 rounded-l-full" alt='Gönderi fotograf' source={require("../images/spor4.jpg")} />
          </View>
        </View>

        <Text className="text-base font-semibold">Dün</Text>

        <View className="w-full flex flex-row space-x-3 items-center">
          <Image
            alt='Profile image'
            source={require("../images/profile.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Kübra gönderini beğendi</Text>
              <Text >19dk</Text>
            </View>
            <Image className="w-20 h-20 rounded-l-full" alt='Gönderi fotograf' source={require("../images/spor4.jpg")} />
          </View>
        </View>

        <View className="w-full flex flex-row space-x-3 items-center">
          <Image
            alt='Profile image'
            source={require("../images/kubra.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Kübra seni takip etmeye başladı</Text>
              <Text >1s</Text>
            </View>
          </View>
        </View>

        <View className="w-full flex flex-row space-x-3 items-center">
          <Image
            alt='Profile image'
            source={require("../images/profile.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Memet gönderine yorum yaptı</Text>
              <Text >19dk</Text>
            </View>
            <Image className="w-20 h-20 rounded-l-full" alt='Gönderi fotograf' source={require("../images/spor4.jpg")} />
          </View>
        </View>

        <Text className="text-base font-semibold">Son 7 Gün</Text>

        <View className="w-full flex flex-row space-x-3 items-center">
          <Image
            alt='Profile image'
            source={require("../images/profile.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Kübra gönderini beğendi</Text>
              <Text >19dk</Text>
            </View>
            <Image className="w-20 h-20 rounded-l-full" alt='Gönderi fotograf' source={require("../images/spor4.jpg")} />
          </View>
        </View>

        <View className="w-full flex flex-row space-x-3 items-center">
          <Image
            alt='Profile image'
            source={require("../images/kubra.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Kübra seni takip etmeye başladı</Text>
              <Text >1s</Text>
            </View>
          </View>
        </View>

        <View className="w-full flex flex-row space-x-3 items-center">
          <Image
            alt='Profile image'
            source={require("../images/profile.jpg")}
            className="w-14 h-14 rounded-full"
          />
          <View className="flex flex-1 flex-row items-center justify-between">
            <View className="flex flex-col h-full justify-stretch">
              <Text className="font-semibold">Memet gönderine yorum yaptı</Text>
              <Text >19dk</Text>
            </View>
            <Image className="w-20 h-20 rounded-l-full" alt='Gönderi fotograf' source={require("../images/spor4.jpg")} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})