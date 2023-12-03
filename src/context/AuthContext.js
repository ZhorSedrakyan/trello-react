import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile
} from 'firebase/auth'
import { auth } from '../firebase'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})

	const createUser = (email, password, username) => {
		return new Promise((resolve, reject) => {
			createUserWithEmailAndPassword(auth, email, password)
				.then(({ user }) => {
					updateProfile(user, { displayName: username })
						.then(() => {
							resolve(user)
						})
						.catch(reject)
				})
				.catch(reject)
		})
	}

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			console.log('currentUser')
			console.log(currentUser)
			setUser(currentUser)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<UserContext.Provider value={{ createUser, user, logout, signIn }}>
			{children}
		</UserContext.Provider>
	)
}

export const UserAuth = () => {
	const profile = useContext(UserContext)

	return profile
}
