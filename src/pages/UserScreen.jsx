import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { fetchUserPosts } from "../services/firebase/Post";
import PostModal from "../modals/PostModal";
import {
  followUser,
  getFollowersCount,
  getFollowingCount,
  isUserFollowing,
  unfollowUser,
} from "../services/firebase/Follow";

const UserScreen = ({ route }) => {
  const { person } = route.params;
  const [userId, setUserId] = useState();
  const [authUserId, setAuthUserId] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState();
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    setUserId(person?.id);
  }, [person]);

  const loadUserData = async () => {
    if (authUserId && userId) {
      isFollowingHandle();
      const followingCount = await getFollowingCount(userId);
      const followersCount = await getFollowersCount(userId);
      setFollowingCount(followingCount);
      setFollowersCount(followersCount);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [authUserId, userId]);

  const isFollowingHandle = async () => {
    const following = await isUserFollowing(authUserId, userId);
    setIsFollowing(following);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUserId(user.uid);
      } else {
        console.log("kullanıcı bulunamadı");
      }
    });

    if (userId) {
      const getPosts = async () => {
        const posts = await fetchUserPosts(userId);
        setUserPosts(posts);
      };

      getPosts();
      console.log(userPosts);
    }
  }, [userId]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => openModal(item)}>
      <Image source={{ uri: item.photoUrl }} style={styles.image} />
    </Pressable>
  );

  const follow = async () => {
    await followUser(authUserId, userId);
    loadUserData();
    isFollowingHandle();
  };

  const unfollow = async () => {
    await unfollowUser(authUserId, userId);
    loadUserData();
    isFollowingHandle();
  };

  return (
    <ScrollView className="flex  bg-[#FF7511] relative">
      <View className="flex h-screen space-y-2 mt-8 rounded-t-3xl bg-white py-3">
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          className="-top-8"
        >
          {person.profilePicture !== undefined ? (
            <Image
              source={{ uri: person.profilePicture }}
              alt="profile"
              className="h-28 w-28 rounded-xl"
            />
          ) : (
            <Image
              source={require("../images/pp.png")}
              alt="profile"
              className="h-28 w-28 rounded-xl"
            />
          )}
        </View>

        <View className="flex flex-row items-center justify-around">
          <View className="flex flex-col items-center justify-center">
            <Text className="text-2xl font-semibold">{followersCount}</Text>
            <Text>followers</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <Text className="text-2xl font-semibold">{followingCount}</Text>
            <Text>following</Text>
          </View>
        </View>

        <View className="flex items-center">
          <Text className="text-lg font-semibold">{person.fullName}</Text>
          <Text>{person.username}</Text>
        </View>

        {isFollowing !== true ? (
          <Pressable
            onPress={follow}
            className="bg-black w-28 flex items-center justify-center p-2 rounded-full self-center"
          >
            <Text className="text-white tracking-widest">Takip et</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={unfollow}
            className="bg-black w-36 flex items-center justify-center p-2 rounded-full self-center"
          >
            <Text className="text-white tracking-widest">Takibi bırak</Text>
          </Pressable>
        )}
        <Text className="text-base font-bold ml-2">Posts</Text>
        <FlatList
          style={{ padding: 5 }}
          data={userPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
      <PostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        post={selectedPost}
        fullName={person.fullName}
        profilePicture={person.profilePicture}
      />
    </ScrollView>
  );
};

export default UserScreen;

const { width } = Dimensions.get("window");
const itemSize = (width - 20) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  item: {
    flex: 1,
    margin: 2,
    height: itemSize,
    borderRadius: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 3,
  },
});
