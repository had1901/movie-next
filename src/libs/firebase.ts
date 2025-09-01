
import { initializeApp, getApps, getApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBHXGK8jYinrpk9c6xpHWUy5YgmwTNTFxE",
  authDomain: "movies-2704e.firebaseapp.com",
  projectId: "movies-2704e",
  storageBucket: "movies-2704e.firebasestorage.app",
  messagingSenderId: "790420642815",
  appId: "1:790420642815:web:b95fb912e6d2123c50e5ca",
  measurementId: "G-BCJEYZR4CS"
}


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app) // Tạo method cho việc xác thực user
export const db = getFirestore(app) // Tạo store database
export const providerGoogle = new GoogleAuthProvider()
export const providerGithub = new GithubAuthProvider()
// const analytics = getAnalytics(app)


// config google
providerGoogle.setCustomParameters({
  prompt: "select_account" // luôn bắt chọn tài khoản
})



