
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyC-cTljklVsZbQl6SGkzzXCUSQqOyb8IDM",
    authDomain: "netflix-clone-15def.firebaseapp.com",
    projectId: "netflix-clone-15def",
    storageBucket: "netflix-clone-15def.firebasestorage.app",
    messagingSenderId: "809254340721",
    appId: "1:809254340721:web:e98d8f50f4d10c3913b3d0",
    measurementId: "G-4B1S5ZFYTM"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async (name, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        
        const user = res.user
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const logout = () =>{
    signOut(auth)
}

export {auth, db, login,signUp, logout}

// const analytics = getAnalytics(app);