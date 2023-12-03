import React from 'react'
import styles from './StillNotLogedIn.module.css'

function StillNotLogedIn() {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				To use all features of the website, you need to log in
			</p>
		</div>
	)
}

export default StillNotLogedIn
