import React, { useState, Fragment, useEffect } from 'react'
import styles from './Todos.module.css'
import { Dialog, Transition, RadioGroup } from '@headlessui/react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import {
	addDoc,
	collection,
	onSnapshot,
	query,
	deleteDoc,
	doc,
	updateDoc
} from 'firebase/firestore'
import { db } from '../../firebase'
import { DragDropContext } from 'react-beautiful-dnd'
import Board from '../Board/Board'
import toast, { Toaster } from 'react-hot-toast'
import { UserAuth } from '../../context/AuthContext'

const radioGroupDatas = [
	{
		id: 'new',
		name: 'Todo',
		description: 'A new task to be completed.',
		color: 'bg-red-500'
	},
	{
		id: 'inprogress',
		name: 'In Progress',
		description: 'A task that is currently being worked on.',
		color: 'bg-yellow-500'
	},
	{
		id: 'done',
		name: 'Done',
		description: 'A task that has beem completed.',
		color: 'bg-green-500'
	}
]

export default function Todos() {
	const [tasks, setTasks] = useState({
		newTasks: [],
		inProgressTasks: [],
		doneTasks: []
	})
	const [openModal, setOpenModal] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [newTaskValue, setNewTaskValue] = useState({})
	const { user } = UserAuth()

	const handleChangeInputValue = e => {
		setInputValue(e.target.value)
	}

	const handleOnClose = () => {
		setOpenModal(false)
		setInputValue('')
		setNewTaskValue({})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			if (inputValue && newTaskValue?.id) {
				await addDoc(collection(db, 'tasks'), {
					title: inputValue,
					taskStatus: newTaskValue.id
				})
			}
		} catch (err) {
			console.log('Error')
			console.log(err)
		}
	}
	const handleQuerySnapshot = querySnapshot => {
		const tasksArray = []

		querySnapshot.forEach(doc => {
			tasksArray.push({ ...doc.data(), id: doc.id })
		})

		const filterNewTasks = tasksArray.filter(item => item.taskStatus === 'new')
		const filterInProgressTasks = tasksArray.filter(
			item => item.taskStatus === 'inprogress'
		)
		const filterDoneTasks = tasksArray.filter(
			item => item.taskStatus === 'done'
		)

		setTasks(prev => ({
			...prev,
			newTasks: filterNewTasks.length > 0 ? filterNewTasks : [],
			inProgressTasks:
				filterInProgressTasks.length > 0 ? filterInProgressTasks : [],
			doneTasks: filterDoneTasks.length > 0 ? filterDoneTasks : []
		}))
		handleOnClose()
	}

	useEffect(() => {
		const q = query(collection(db, 'tasks'))

		const unsub = onSnapshot(q, handleQuerySnapshot)

		return () => unsub()
	}, [])

	const handleDelete = async id => {
		await deleteDoc(doc(db, 'tasks', id))
	}

	const handleUpdate = async (id, updatedData) => {
		const taskRef = doc(db, 'tasks', id)

		await updateDoc(taskRef, updatedData)
	}

	const handleOnDragEnd = result => {
		if (!user) {
			return toast.error(
				'To use all features of the website, you need to log in'
			)
		}
		const { destination, source, type, draggableId } = result
		const q = query(collection(db, 'tasks'))
		const unsub = onSnapshot(q, handleQuerySnapshot)

		if (!destination || source?.droppableId == destination?.droppableId) return

		const updateFirebase = {
			taskStatus:
				destination?.droppableId == 1
					? 'new'
					: destination?.droppableId == 2
					? 'inprogress'
					: destination?.droppableId == 3
					? 'done'
					: ''
		}

		handleUpdate(draggableId, updateFirebase)
		unsub()
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<Board
						task={tasks.newTasks}
						title='To Do'
						handleDelete={handleDelete}
						setOpenModal={setOpenModal}
						id='1'
					/>

					<Board
						task={tasks.inProgressTasks}
						title='In Progress'
						handleDelete={handleDelete}
						setOpenModal={setOpenModal}
						id='2'
					/>

					<Board
						task={tasks.doneTasks}
						title='Done'
						handleDelete={handleDelete}
						setOpenModal={setOpenModal}
						id='3'
					/>
				</div>
			</div>
			<Transition appear show={openModal} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={handleOnClose}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black/25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title
										as='h3'
										className='text-lg font-medium leading-6 text-gray-900'
									>
										Add a Task
									</Dialog.Title>

									<div className='mt-2'>
										<input
											type='text'
											className='w-full border border-gray-300 rounded-md outline-none p-4'
											placeholder='Enter a task here'
											onChange={handleChangeInputValue}
											value={inputValue}
										/>
									</div>

									<div className='w-full py-5'>
										<div className='mx-auto w-full max-w-md'>
											<RadioGroup
												value={newTaskValue}
												onChange={e => {
													setNewTaskValue(e)
												}}
											>
												<div className='space-y-2'>
													{radioGroupDatas.map(item => (
														<RadioGroup.Option
															key={item.id}
															value={item}
															className={({ active, checked }) =>
																`${
																	active
																		? `ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 `
																		: ''
																}
                  ${checked ? `${item.color} text-white` : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
															}
														>
															{({ active, checked }) => (
																<>
																	<div className='flex w-full items-center justify-between'>
																		<div className='flex items-center'>
																			<div className='text-sm'>
																				<RadioGroup.Label
																					as='p'
																					className={`font-medium  ${
																						checked
																							? 'text-white'
																							: 'text-gray-900'
																					}`}
																				>
																					{item.name}
																				</RadioGroup.Label>
																				<RadioGroup.Description
																					as='span'
																					className={`inline ${
																						checked
																							? 'text-sky-100'
																							: 'text-gray-500'
																					}`}
																				>
																					<span>{item.description}</span>{' '}
																					<span aria-hidden='true'>
																						&middot;
																					</span>{' '}
																				</RadioGroup.Description>
																			</div>
																		</div>
																		{checked && (
																			<div className='shrink-0 text-white'>
																				<IoCheckmarkCircle className='h-6 w-6' />
																			</div>
																		)}
																	</div>
																</>
															)}
														</RadioGroup.Option>
													))}
												</div>
											</RadioGroup>
										</div>
									</div>
									<div className='mt-4'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer'
											onClick={handleSubmit}
											disabled={
												!inputValue || !newTaskValue.color ? true : false
											}
										>
											Add Task
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<Toaster />
		</DragDropContext>
	)
}
