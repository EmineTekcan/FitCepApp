import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../../config/FirebaseConfig";

const fetchUserPosts = async (userId) => {
  const q = query(collection(firestore, "posts"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    posts.push({ id: doc.id, ...doc.data() });
  });

  return posts;
};

const postGonderi = async (
  userId,
  description,
  image,
) => {
  const postsCollectionRef = collection(firestore, "posts");

  try {
    const docRef = await addDoc(postsCollectionRef, {
      userId: userId,
      description: description,
      photoUrl: image,
      createdAt: new Date(),
    });

    console.log("Gönderi başarıyla eklendi: ", docRef.id);
  } catch (error) {
    console.error("Gönderi eklenirken bir hata oluştu: ", error);
  }
};

const deletePost = async (postId) => {
  const postDocRef = doc(firestore, "posts", postId);

  try {
    await deleteDoc(postDocRef);
    console.log("Gönderi başarıyla silindi:", postId);
  } catch (error) {
    console.error("Gönderi silinirken bir hata oluştu:", error);
  }
};


const getPostsWithUserDetails = async () => {
  // Postları çek
  const postsCollectionRef = query(collection(firestore, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(postsCollectionRef);
  const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // Her post için kullanıcı detaylarını çek
  const postsWithUserDetails = await Promise.all(posts.map(async (post) => {
    const userRef = doc(firestore, "users", post.userId); // "users" koleksiyonunu ve postun userId'sini kullan
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    return { ...post, ...userData }; // Posta kullanıcı detaylarını ekle
  }));

  return postsWithUserDetails;
};

const checkIfUserLikedPost = async (postId, userId) => {
  const likesRef = collection(firestore, "likes");
  const q = query(
    likesRef,
    where("postId", "==", postId),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Eğer sorgu sonucu boş değilse, kullanıcı postu beğenmiş demektir.
};

const likePost = async (postId) => {
  const postRef = doc(firestore, "posts", postId);

  try {
    await updateDoc(postRef, {
      likes: increment(1),
    });
    console.log("Beğeni sayısı artırıldı.");
  } catch (error) {
    console.error("Beğeni eklenirken hata oluştu: ", error);
  }
};

const addLike = async (postId, userId, username) => {
  const likeDoc = {
    postId,
    userId,
    username,
  };
  await addDoc(collection(firestore, "likes"), likeDoc).then(() => {
    likePost(postId);
  });
};

const unlikePost = async (postId, userId) => {
  const likesRef = collection(firestore, "likes");
  const q = query(
    likesRef,
    where("postId", "==", postId),
    where("userId", "==", userId)
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(firestore, "likes", document.id));
    });

    const postRef = doc(firestore, "posts", postId);
    await updateDoc(postRef, {
      likes: increment(-1),
    });
    console.log("Beğeni sayısı azaltıldı ve beğeni dokümanı silindi.");
  } catch (error) {
    console.error("Beğeni geri alınırken hata oluştu: ", error);
  }
};

const addComment = async (postId, userId, displayName, text) => {
  try {
    await addDoc(collection(firestore, "comments"), {
      postId: postId,
      userId: userId,
      displayName: displayName,
      text: text,
      createdAt: new Date(),
    });

    const postRef = doc(firestore, "posts", postId);
    await updateDoc(postRef, {
      commentCount: increment(1),
    });

    console.log("Yorum başarıyla eklendi ve gönderi yorum sayısı güncellendi.");
  } catch (error) {
    console.error("Yorum eklerken bir hata oluştu: ", error);
  }
};

const deleteComment = async (commentId, postId) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      commentCount: increment(-1),
    });

    console.log("Yorum başarıyla silindi ve gönderi yorum sayısı güncellendi.");
  } catch (error) {
    console.error("Yorum silinirken bir hata oluştu: ", error);
  }
};


export {
  postGonderi,
  getPostsWithUserDetails,
  likePost,
  unlikePost,
  addLike,
  checkIfUserLikedPost,
  addComment,
  deleteComment,
  fetchUserPosts,
  deletePost
};







