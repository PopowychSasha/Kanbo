import './Header.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAccountDataCreator, removeAccountDataCreator } from '../../redux/actionCreators/accountData';
import { Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const mainUserData = useSelector(store => store.accountDataReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncAccountDataCreator());
	}, []);
	const navigate = useNavigate();

	return (
		<header className='header-wrapper'>
			<div>
				<h1>Nickname={mainUserData.nickname}</h1>
			</div>
			<div>
				<h1>Email={mainUserData.email}</h1>
			</div>
			<div>
				<Image
					cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
					publicId={mainUserData.avatarPublicId}
					width='200px'
				/>
			</div>
			<button
				onClick={() => {
          dispatch(removeAccountDataCreator());
					document.cookie = 'nickname=';
					document.cookie = 'token=';
					navigate('/');
				}}>
				Exit
			</button>
		</header>
	);
};

export default Header;
