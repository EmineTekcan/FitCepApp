import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/FirebaseConfig"; 

const searchUsersByFullName = async (searchQuery) => {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('fullName', '>=', searchQuery), where('fullName', '<=', searchQuery + '\uf8ff'));
    const querySnapshot = await getDocs(q);
  
    let users = [];
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
    });
  
    return users;
};

export { searchUsersByFullName };
