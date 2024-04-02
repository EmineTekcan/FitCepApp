import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { auth, firestore } from "../../config/FirebaseConfig";
import { fetchUserPosts } from "../services/firebase/Post";
import PostModal from "../modals/PostModal";
import {
  getFollowersCount,
  getFollowersList,
  getFollowingCount,
  getFollowingList,
} from "../services/firebase/Follow";
import FollowListModal from "../modals/FollowerListModal";
import FollowingListModal from "../modals/FollowingListModal";
import FollowerListModal from "../modals/FollowerListModal";

const ProfileScreen = () => {
  const [userId, setUserId] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [following, setFollowing] = useState("");
  const [followers, setFollowers] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [followingListModalVisible, setFollowingListModalVisible] =
    useState(false);
  const [followersListModalVisible, setFollowersListModalVisible] =
    useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerLİst] = useState([]);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        getUserDetailsByUid(userId);
      }
    }, [userId])
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user?.uid);
        getUserDetailsByUid(user?.uid);
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
    }
  }, [userId]);

  const getUserDetailsByUid = async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      const followingCount = await getFollowingCount(userId);
      const followersCount = await getFollowersCount(userId);
      setFollowing(followingCount);
      setFollowers(followersCount);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUsername(data?.username);
        setFullName(data?.fullName);
        setPhotoUrl(data?.profilePicture);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri alınırken bir hata oluştu:", error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getUserDetailsByUid(userId);
    setRefreshing(false); // Bu satır, gerçek veri yüklemesi tamamlandıktan sonra çağrılmalıdır
  }, []);

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => openModal(item)}>
      <Image source={{ uri: item.photoUrl }} style={styles.image} />
    </Pressable>
  );

  const getFollowingUsers = async () => {
    const users = await getFollowingList(userId);
    setFollowingList(users);
    setFollowingListModalVisible(true);
  };

  const getFollowersUsers = async () => {
    const users = await getFollowersList(userId);
    setFollowerLİst(users);
    setFollowersListModalVisible(true);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="flex  bg-[#FF7511] relative"
    >
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
          {photoUrl !== undefined ? (
            <Image
              source={{ uri: photoUrl }}
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
          <Pressable
            onPress={getFollowersUsers}
            className="flex flex-col items-center justify-center"
          >
            <Text className="text-2xl font-semibold">{followers}</Text>
            <Text>followers</Text>
          </Pressable>
          <Pressable
            onPress={getFollowingUsers}
            className="flex flex-col items-center justify-center"
          >
            <Text className="text-2xl font-semibold">{following}</Text>
            <Text>following</Text>
          </Pressable>
        </View>

        <View className="flex items-center">
          <Text className="text-lg font-semibold">{fullName}</Text>
          <Text>{username}</Text>
        </View>
        <Text className="text-base font-semibold ml-2">Posts</Text>

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
        fullName={fullName}
        profilePicture={photoUrl}
      />
      <FollowingListModal
        onClose={() => setFollowingListModalVisible(false)}
        visible={followingListModalVisible}
        users={followingList}
      />
      <FollowerListModal
        authUserId={userId}
        onClose={() => setFollowersListModalVisible(false)}
        visible={followersListModalVisible}
        users={followerList}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

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
