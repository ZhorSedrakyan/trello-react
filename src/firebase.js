import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBLn-MPp9P7Nhum8aY9fzYpwWDg_GAbzl8',
	authDomain: 'trell-react.firebaseapp.com',
	projectId: 'trell-react',
	storageBucket: 'trell-react.appspot.com',
	messagingSenderId: '305672208503',
	appId: '1:305672208503:web:ce770cea3f8ef3c7024672'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
