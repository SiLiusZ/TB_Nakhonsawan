// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr1tlRiZ5-mov_z9LLjRmxy1dMZq-oZcY",
  authDomain: "tb-nakhonsawan.firebaseapp.com",
  projectId: "tb-nakhonsawan",
  storageBucket: "tb-nakhonsawan.appspot.com",
  messagingSenderId: "120719107641",
  appId: "1:120719107641:web:d9c7d7d550005a3a224fe8",
  measurementId: "G-3MRKTJF9WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Register User Function
function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User registered: ", user);
        })
        .catch((error) => {
            console.error("Error registering user: ", error);
        });
}

// Login User Function
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in: ", user);
        })
        .catch((error) => {
            console.error("Error logging in user: ", error);
        });
}

// Save User Data to Firestore
async function saveUserData(userId, userData) {
    try {
        await setDoc(doc(db, "users", userId), userData);
        console.log("User data saved successfully!");
    } catch (error) {
        console.error("Error saving user data: ", error);
    }
}

// Get User Data from Firestore
async function getUserData(userId) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("User data: ", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

// Export functions for use in other parts of your app
export { registerUser, loginUser, saveUserData, getUserData };
