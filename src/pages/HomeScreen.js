import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  addComment,
  addLike,
  checkIfUserLikedPost,
  unlikePost,
} from "../services/firebase/Post";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../config/FirebaseConfig";
import CommentModal from "../modals/CommentModal";
import { TextInput } from "react-native-gesture-handler";
import CommentsModal from "../modals/CommentsModal";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [allCommentsVisible, setAllCommentsVisible] = useState(false);

  const openCommentModal = (postId) => {
    setIsCommentModalVisible(true);
  };

  const submitComment = (postId, userId, displayName, comment) => {
    addComment(postId, userId, displayName, comment);
  };

  const fetchPostsAndCheckLikes = async () => {
    if (!userId) return;

    const postsCollectionRef = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc")
    );

    try {
      const querySnapshot = await getDocs(postsCollectionRef);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          const userRef = doc(firestore, "users", post.userId);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            console.log("No such user!");
            return post; // or handle this case as you see fit
          }
          const userData = userSnap.data();
          return { ...post, ...userData };
        })
      );

      const postsWithLikeStatus = await Promise.all(
        postsWithUserDetails.map(async (post) => {
          const isUserLiked = await checkIfUserLikedPost(post.id, userId);
          return { ...post, isUserLiked };
        })
      );

      setPosts(postsWithLikeStatus);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    fetchPostsAndCheckLikes();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setDisplayName(user.displayName);
      } else {
        console.log("kullanıcı bulunamadı");
      }
    });
  }, [userId]);

  const formatDate = (firebaseTimestamp) => {
    const date = firebaseTimestamp.toDate();
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLike = async (postId) => {
    await addLike(postId, userId, displayName);
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, isUserLiked: true };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleUnlike = async (postId) => {
    await unlikePost(postId, userId);
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, isUserLiked: false };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const setCloseAllCommentModal = () => {
    setAllCommentsVisible(false);
  };

  return (
    <View className="flex flex-1 bg-white">
      {posts.length <= 0 ? (
        <Text>Hiç gönderi yok</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View className="bg-white flex rounded-md mt-4 p-2 space-y-2 pb-3">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row gap-2 items-center">
                  {item.profilePicture !== null ? (
                    <Image
                      className="w-14 h-14 rounded-full"
                      source={{ uri: item.profilePicture }}
                      alt="profile image"
                    />
                  ) : (
                    <Image
                      className="w-14 h-14 rounded-full"
                      source={require("../images/pp.png")}
                    />
                  )}

                  <View className="flex flex-col">
                    <Text className="text-black text-base font-semibold">
                      {item.fullName}
                    </Text>
                    <Text className="text-slate-700 text">
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                </View>
                <Entypo name="dots-three-vertical" size={20} color="black" />
              </View>
              <View>
                <Text className="text-black text-xs">{item.description}</Text>
              </View>
              <View>
                {item.photoUrl && (
                  <Image
                    className="w-full h-60 rounded-2xl"
                    source={{ uri: item.photoUrl }}
                    alt="profile image"
                  />
                )}
              </View>

              {/* Comment and Like */}
              <View className="flex flex-col">
                <View className="flex flex-row gap-2">
                  <View className="flex flex-row gap-1 items-center">
                    <Pressable
                      onPress={() =>
                        item.isUserLiked
                          ? handleUnlike(item.id)
                          : handleLike(item.id)
                      }
                    >
                      <Octicons
                        name="heart"
                        size={20}
                        color={item.isUserLiked ? "red" : "black"}
                      />
                    </Pressable>
                    <Text className="font-semibold">
                      {item.likes <= 0 ? 0 : item.likes}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-1 items-center">
                    <Pressable onPress={() => openCommentModal(true)}>
                      <MaterialCommunityIcons
                        name="comment-processing-outline"
                        size={22}
                        color="black"
                      />
                    </Pressable>
                  </View>
                </View>
                {item.commentCount <= 0 ? (
                  (<Text>Henüz yorum yok</Text>)()
                ) : (
                  <Pressable
                    onPress={() => setAllCommentsVisible(!allCommentsVisible)}
                    className="flex"
                  >
                    <Text className="text-gray-500">
                      {" "}
                      {item.commentCount} yorumların tümünü gör...
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Create Comment Modal*/}
              <Modal
                visible={isCommentModalVisible}
                animationType="slide"
                transparent={true}
              >
                <View className="bottom-0 absolute bg-gray-200 h-[20%] w-full rounded-t-3xl p-4">
                  <View className="flex flex-row">
                    <TextInput
                      className="flex-1"
                      editable
                      multiline
                      numberOfLines={4}
                      maxLength={150}
                      placeholder="Yorum..."
                      onChangeText={(text) => setComment(text)}
                      value={comment}
                      style={{ textAlignVertical: "top" }}
                    />
                    <Pressable onPress={() => setIsCommentModalVisible(false)}>
                      <Entypo name="cross" size={24} color="black" />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => {
                      submitComment(item.id, userId, displayName, comment);
                      setIsCommentModalVisible(false);
                    }}
                    className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center self-end"
                  >
                    <AntDesign name="arrowup" size={24} color="white" />
                  </Pressable>
                </View>
              </Modal>

              {allCommentsVisible && (
                <Modal
                  visible={allCommentsVisible}
                  animationType="slide"
                  transparent={true}
                >
                  <CommentsModal
                    onClose={setCloseAllCommentModal}
                    postId={item.id}
                  />
                </Modal>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
