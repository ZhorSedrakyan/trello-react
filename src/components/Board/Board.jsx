import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styles from './Board.module.css'
import { HiPlusCircle } from 'react-icons/hi'
import EmptyList from '../EmptyList/EmptyList'
import Todo from '../Todo/Todo'
import { UserAuth } from '../../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'

function Board({ task, title, handleDelete, setOpenModal, id }) {
	const { user } = UserAuth()

	return (
		<div className={styles.contentTodo}>
			<div className={styles.contentHeader}>
				<h2 className={styles.contentTitle}>{title}</h2>
				{task?.length > 0 && (
					<p className={styles.contentCount}>{task.length}</p>
				)}
			</div>

			{task?.length > 0 ? (
				task.map((item, index) => (
					<Droppable droppableId={id}>
						{(provide, snapshot) => (
							<div
								ref={provide.innerRef}
								{...provide.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								<Todo
									item={item}
									handleDelete={handleDelete}
									key={item.id}
									index={index}
								/>
								{provide.placeholder}
							</div>
						)}
					</Droppable>
				))
			) : (
				<Droppable droppableId={id}>
					{(provide, snapshot) => (
						<div
							ref={provide.innerRef}
							{...provide.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							<EmptyList />
							{provide.placeholder}
						</div>
					)}
				</Droppable>
			)}

			<div className={styles.contentCircle}>
				<HiPlusCircle
					color='rgb(135,198,134)'
					fontSize={30}
					className={styles.plusCircle}
					onClick={() => {
						if (!user) {
							return toast.error(
								'To use all features of the website, you need to log in'
							)
						}
						setOpenModal(true)
					}}
				/>
			</div>
			<Toaster />
		</div>
	)
}

export default Board
