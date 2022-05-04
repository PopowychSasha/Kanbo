import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StartedPage from '../../pages/StartedPage/StartedPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import BoardsPage from '../../pages/BoardsPage/BoardsPage';
import BoardPage from '../../pages/BoardPage/BoardPage';
import TaskDetailsPage from '../BoardPage/TaskDetailsPage/TaskDetailsPage';
import './App.scss';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';


const App = () => {
	const { isLogIn } = useSelector(store => store.authDataReducer);

	return (
		<Routes>
			<Route path='/' element={<StartedPage />} />
			<Route path='/login' element={<LoginPage />} />
			{isLogIn && <Route path='/boards' element={<BoardsPage />} />}
			{isLogIn && <Route path='/board/:id' element={<BoardPage />} />}
			{isLogIn && <Route path='/task/details/:id' element={<TaskDetailsPage />} />}
			{isLogIn && <Route path='/account/settings' element={<SettingsPage/>} />}
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default App;
