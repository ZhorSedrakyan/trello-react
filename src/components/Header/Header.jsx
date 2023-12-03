import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import ProfileMenu from './ProfileMenu/ProfileMenu'

const Header = () => {
	const { user } = UserAuth()
	const navigate = useNavigate()

	function handleNavigateToHome() {
		navigate('/')
		window.location.reload()
	}

	const handleNavigation = toRoute => {
		navigate(toRoute)
	}

	return (
		<div className={styles.container}>
			<header initial='hidden' whileInView='visible' className={styles.header}>
				<div className={styles.imgContainer}>
					<img
						onClick={handleNavigateToHome}
						src='/image/trello.png'
						alt='LOGO'
						className={styles.img}
					/>
				</div>

				<div className={styles.contentContainer}>
					{user ? (
						<ProfileMenu />
					) : (
						<ul className={styles.contentContainerList}>
							<li
								className={styles.contentContainerItem}
								onClick={() => handleNavigation('/signIn')}
							>
								Sign In
							</li>
							<li
								className={styles.contentContainerItem}
								onClick={() => handleNavigation('/signUp')}
							>
								Sign Up
							</li>
						</ul>
					)}
				</div>
			</header>
		</div>
	)
}
export default Header
