import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

import StartedPage from '../../pages/StartedPage/StartedPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import BoardsPage from '../../pages/BoardsPage/BoardsPage';
import { useSelector } from 'react-redux';
import BoardPage from '../../pages/BoardPage/BoardPage';

const App = () => {
	const { isLogIn } = useSelector(store => store.authDataReducer);

	return (
		<Routes>
			<Route path='/' element={<StartedPage />} />
			<Route path='/login' element={<LoginPage />} />
			{isLogIn && <Route path='/boards' element={<BoardsPage />} />}
			{isLogIn && <Route path='/board/:id' element={<BoardPage />} />}
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default App;
