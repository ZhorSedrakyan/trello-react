import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import styles from './SignUp.module.css'
import toast, { Toaster } from 'react-hot-toast'

export default function SignUp() {
	const navigation = useNavigate()
	const [values, setValues] = useState({
		email: '',
		password: '',
		username: ''
	})

	const { createUser } = UserAuth()

	const handleChangeValues = e => {
		setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const user = await createUser(
				values.email,
				values.password,
				values.username
			)

			toast.success('You are already sign up')

			setTimeout(() => {
				navigation('/')
			}, 2000)
		} catch (error) {
			console.log('sing up error')
			console.log(error)
		}
	}

	return (
		<>
			<section className={styles.section}>
				<div className={styles.formBox}>
					<div className={styles.formValue}>
						<form action=''>
							<h2 className={styles.title}>Sign Up</h2>
							<div className={styles.inputbox}>
								<ion-icon name='mail-outline'></ion-icon>
								<input
									type='email'
									required
									name='email'
									onChange={handleChangeValues}
								/>
								<label>Email</label>
							</div>
							<div className={styles.inputbox}>
								<ion-icon name='mail-outline'></ion-icon>
								<input
									type='text'
									required
									name='username'
									onChange={handleChangeValues}
								/>
								<label>User Name</label>
							</div>
							<div className={styles.inputbox}>
								<ion-icon name='lock-closed-outline'></ion-icon>
								<input
									type='password'
									required
									name='password'
									onChange={handleChangeValues}
								/>
								<label>Password</label>
							</div>
							<button onClick={handleSubmit} className={styles.logoutButton}>
								Sign Up
							</button>
							<div className={styles.register}>
								<p>
									You have a account? <Link to='/signIn'>Login</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</section>
			<Toaster />
		</>
	)
}
