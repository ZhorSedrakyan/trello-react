import React from 'react'
import styles from './ProfileMenu.module.css'
import { UserAuth } from '../../../context/AuthContext'
import { useState } from 'react'
import { TbLogout } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

export default function ProfileMenu() {
	const { user, logout } = UserAuth()
	const [active, setActive] = useState(false)
	const navigate = useNavigate()

	const handleClickMenu = () => {
		setActive(!active)
	}

	const handleLogout = async () => {
		try {
			await logout()
			navigate('/signIn')
			console.log('You are logged out')
		} catch (error) {
			console.log('handle logout')
			console.log(error)
		}
	}

	const handleNavigate = () => {
		navigate('/login')
	}

	return (
		<div className={styles.userDiv}>
			<div className={styles.action} onClick={handleClickMenu}>
				<div className={styles.profile}>
					<img
						alt='img'
						src={
							!user?.avatar?.jpeg
								? '/image/defaultAvatar.png'
								: user?.avatar?.jpeg
						}
					/>
				</div>
				<div className={`${styles.menu} ${active && styles.active}`}>
					<ul className={styles.menuUl}>
						{user ? (
							<>
								<li>{user?.displayName}</li>

								<li>
									<TbLogout className={styles.icon} />
									<a onClick={handleLogout}>Logout</a>
								</li>
							</>
						) : (
							<li onClick={handleNavigate} style={{ cursor: 'pointer' }}>
								Login / Auth
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}
