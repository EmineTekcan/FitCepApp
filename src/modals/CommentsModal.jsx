import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../config/FirebaseConfig";
import { AntDesign } from "@expo/vector-icons";

const CommentsModal = ({ postId ,onClose}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(firestore, "comments"),
        where("postId", "==", postId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(fetchedComments);
    };

    fetchComments();
  }, [postId]);

  const formatDate = (firebaseTimestamp) => {
    const date = firebaseTimestamp.toDate();
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View className="absolute bottom-0 bg-gray-200 h-[30%] w-full rounded-t-3xl p-3">
      <View className="flex flex-row">
        <Text className="text-center font-semibold text-base flex-1">
          Yorumlar
        </Text>
        <Pressable onPress={onClose}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <View className="flex flex-row items-center space-x-2">
              <Text style={{ fontWeight: "bold" }}>{item.displayName}</Text>
              <Text style={{ color: "grey", fontSize: 12 }}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
            <Text className="pl-3">{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({});
