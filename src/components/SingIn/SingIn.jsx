import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import styles from './SingIn.module.css'
import toast, { Toaster } from 'react-hot-toast'

export default function SingIn() {
	const navigation = useNavigate()
	const { signIn } = UserAuth()
	const [values, setValues] = useState({
		email: '',
		password: ''
	})

	const handleChangeValues = e => {
		setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			await signIn(values.email, values.password)
			toast.success('You are already loged in')

			setTimeout(() => {
				navigation('/')
			}, 2000)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className={styles.section}>
			<div className={styles.formBox}>
				<div className={styles.formValue}>
					<form action=''>
						<h2 className={styles.title}>Login</h2>
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
							Log in
						</button>
						<div className={styles.register}>
							<p>
								Don't have a account? <Link to='/signUp'>Register</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
			<Toaster />
		</section>
	)
}
