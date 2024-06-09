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
  const [followingList, setFollowingList] = useState(null);
  const [followerList, setFollowerLİst] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const getPosts = async () => {
    if (userId) {
      const posts = await fetchUserPosts(userId);
      setUserPosts(posts);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user?.uid);
        getUserDetailsByUid(user?.uid);
        getPosts();
      } else {
        console.log("kullanıcı bulunamadı");
      }
    });
  }, [userId]);

  const getUserDetailsByUid = async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      const followingCount = await getFollowingCount(uid);
      const followersCount = await getFollowersCount(uid);
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
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (userId !== null) {
      getUserDetailsByUid(userId);
      getPosts();
      console.log("merhaba");
    }
    setRefreshing(false);
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
          {photoUrl !== undefined && photoUrl !== null ? (
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
            <Text>Takipçiler</Text>
          </Pressable>
          <Pressable
            onPress={getFollowingUsers}
            className="flex flex-col items-center justify-center"
          >
            <Text className="text-2xl font-semibold">{following}</Text>
            <Text>Takip</Text>
          </Pressable>
        </View>

        <View className="flex items-center">
          <Text className="text-lg font-semibold">{fullName}</Text>
          <Text>{username}</Text>
        </View>
        <Text className="text-base font-semibold ml-2">Gönderiler</Text>

        <FlatList
          style={{ padding: 5 }}
          data={userPosts.filter((item) => item)}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
      {photoUrl !== null && photoUrl !== undefined && (
        <PostModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          post={selectedPost}
          fullName={fullName}
          profilePicture={photoUrl}
        />
      )}

      {followingList !== null && (
        <FollowingListModal
          onClose={() => setFollowingListModalVisible(false)}
          visible={followingListModalVisible}
          users={followingList}
        />
      )}
      {followerList !== null && (
        <FollowerListModal
          authUserId={userId}
          onClose={() => setFollowersListModalVisible(false)}
          visible={followersListModalVisible}
          users={followerList}
        />
      )}
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
