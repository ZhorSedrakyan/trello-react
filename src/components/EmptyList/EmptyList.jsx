import React from 'react'
import styles from './EmptyList.module.css'

function EmptyList() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<p className={styles.emptyTitle}>List Is Empty</p>
			</div>
		</div>
	)
}

export default EmptyList
