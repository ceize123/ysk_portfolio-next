// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCjicBOkYKLmsZlZHwTlkOqEjV3clbpDZw",
	authDomain: "ysk-portfolio.firebaseapp.com",
	projectId: "ysk-portfolio",
	storageBucket: "ysk-portfolio.appspot.com",
	messagingSenderId: "843394874509",
	appId: "1:843394874509:web:a5b868332d2b458c5c76c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);