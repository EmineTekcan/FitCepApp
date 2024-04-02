import {
  doc,
  updateDoc,
  arrayUnion,
  getFirestore,
  getDoc,
  setDoc,
  arrayRemove,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../../config/FirebaseConfig";

const followUser = async (currentUserId, userIdToFollow) => {
  const followingRef = doc(firestore, "following", currentUserId);
  const followersRef = doc(firestore, "followers", userIdToFollow);

  const followingDoc = await getDoc(followingRef);
  if (!followingDoc.exists()) {
    await setDoc(followingRef, { usersFollowing: [] });
  }
  await updateDoc(followingRef, {
    usersFollowing: arrayUnion(userIdToFollow),
  });

  const followersDoc = await getDoc(followersRef);
  if (!followersDoc.exists()) {
    await setDoc(followersRef, { usersFollowers: [] });
  }
  await updateDoc(followersRef, {
    usersFollowers: arrayUnion(currentUserId),
  });
};

const unfollowUser = async (currentUserId, userIdToUnfollow) => {
  const followingRef = doc(firestore, "following", currentUserId);
  const followingDoc = await getDoc(followingRef);

  if (followingDoc.exists()) {
    await updateDoc(followingRef, {
      usersFollowing: arrayRemove(userIdToUnfollow),
    });
  } else {
    console.log(
      "No 'following' document to update for currentUserId:",
      currentUserId
    );
  }

  const followersRef = doc(firestore, "followers", userIdToUnfollow);
  const followersDoc = await getDoc(followersRef);

  if (followersDoc.exists()) {
    await updateDoc(followersRef, {
      usersFollowers: arrayRemove(currentUserId),
    });
  } else {
    console.log(
      "No 'followers' document to update for userIdToUnfollow:",
      userIdToUnfollow
    );
  }
};

const isUserFollowing = async (currentUserId, potentialFollowingUserId) => {
  const followingRef = doc(firestore, "following", currentUserId);
  const docSnap = await getDoc(followingRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const isFollowing = data.usersFollowing.includes(potentialFollowingUserId);
    return isFollowing;
  } else {
    return false;
  }
};

const getFollowingCount = async (userId) => {
  const followingRef = doc(firestore, "following", userId);
  const docSnap = await getDoc(followingRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.usersFollowing ? data.usersFollowing.length : 0;
  }
  return 0;
};

const getFollowersCount = async (userId) => {
  const followersRef = doc(firestore, "followers", userId);
  const docSnap = await getDoc(followersRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.usersFollowers ? data.usersFollowers.length : 0;
  }
  return 0;
};

const getFollowersList = async (userId) => {
  const followersRef = doc(firestore, "followers", userId);
  const followersDoc = await getDoc(followersRef);

  if (!followersDoc.exists()) {
    console.log("Belirtilen kullanıcı için takipçi bilgisi bulunamadı.");
    return [];
  }

  const followersIds = followersDoc.data().usersFollowers;

  const followersDetails = await Promise.all(
    followersIds.map(async (followerId) => {
      const userRef = doc(firestore, "users", followerId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return {
          id: followerId,
          name: userDoc.data().username,
          profilePicture: userDoc.data().profilePicture,
        };
      } else {
        return { id: followerId, name: "Bilinmeyen Kullanıcı" };
      }
    })
  );

  return followersDetails;
};

const getFollowingList = async (userId) => {
  const followingRef = doc(firestore, "following", userId);
  const followingDoc = await getDoc(followingRef);

  if (!followingDoc.exists()) {
    return [];
  }

  const followingIds = followingDoc.data().usersFollowing;

  const followingDetails = await Promise.all(
    followingIds.map(async (followingId) => {
      const userRef = doc(firestore, "users", followingId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return {
          id: followingId,
          name: userDoc.data().username,
          profilePicture: userDoc.data().profilePicture,
        };
      } else {
        return { id: followingId, name: "Bilinmeyen Kullanıcı" };
      }
    })
  );

  return followingDetails;
};

export {
  followUser,
  unfollowUser,
  isUserFollowing,
  getFollowersCount,
  getFollowingCount,
  getFollowersList,
  getFollowingList,
};
