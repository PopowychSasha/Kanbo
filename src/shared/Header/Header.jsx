import './Header.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAccountDataCreator } from '../../redux/actionCreators/accountData';
import { Image } from 'cloudinary-react';
import Logo from '../Logo/Logo';
import HeaderDropDown from '../HeaderDropDown/HeaderDropDown';

const Header = () => {
	const mainUserData = useSelector(store => store.accountDataReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncAccountDataCreator());
	}, []);

	return (
		<header className='header-wrapper'>
			<Logo/>
			<div className='avatar'>
				<span>Wellcome <span className='user-nickname'>{mainUserData.nickname} !</span></span>
				<Image
					cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
					publicId={mainUserData.avatarPublicId}
					className="avatar-icon"
				/>
				<HeaderDropDown/>
			</div>	
		</header>
	);
};

export default Header;
