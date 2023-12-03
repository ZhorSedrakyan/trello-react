import React from 'react'
import styles from './Todo.module.css'
import { TiDelete } from 'react-icons/ti'
import { Draggable } from 'react-beautiful-dnd'

function Todo({ item, handleDelete, index }) {
	return (
		<Draggable draggableId={`${item.id}`} key={item.id} index={index}>
			{(provided, snapshot) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
					className={styles.itemWrapper}
				>
					<div
						className={`${styles.item}`}
						style={{
							background: snapshot.isDragging && 'lightgreen'
						}}
					>
						<p
							className={styles.itemTitle}
							// style={{ color: snapshot.isDragging && 'white' }}
						>
							{item.title}
						</p>
						<p className={styles.itemTitle}>{provided.placeholder}</p>
						<TiDelete
							color={snapshot.isDragging ? 'white' : 'crimson'}
							size={30}
							className={styles.deleteIcon}
							onClick={() => handleDelete(item.id)}
						/>
					</div>
				</div>
			)}
		</Draggable>
	)
}

export default Todo
