import { Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import SingIn from './components/SingIn/SingIn'
import HomePage from './components/HomePage/HomePage'
import { AuthContextProvider } from './context/AuthContext'

function App() {
	return (
		<div>
			<AuthContextProvider>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/signUp' element={<SignUp />} />
					<Route path='/signIn' element={<SingIn />} />
				</Routes>
			</AuthContextProvider>
		</div>
	)
}

export default App
