import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Image } from 'cloudinary-react';
import { Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ImagePicker from '../../components/LoginPage/ImagePicker/ImagePicker';
import { asyncAccountDataCreator } from '../../redux/actionCreators/accountData';
import './SettingsPage.scss';
import { changeUserData } from '../../utils/changeUserData';
import { EMAIL, NEW_PASSWORD, OLD_PASSWORD,SAVE_CHANGES } from '../../constants/SettingsPage';

const SettingsPage = () => {
	const mainUserData = useSelector(store => store.accountDataReducer);
	const [pickedImageUrl, setPickedImageUrl] = useState('');
	const [imageSelected, setImageSelected] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	useEffect(() => {
		dispatch(asyncAccountDataCreator());
	}, []);

	const onSubmitFormHandler = event => {
		event.preventDefault();

		if (!imageSelected || !email || !oldPassword || !newPassword) {
			toast.warning('Everythink must be filled!');
			return;
		}

		const formData = new FormData();
		formData.append('file', imageSelected);
		formData.append('upload_preset', 'yb6djiab');

		changeUserData(formData,mainUserData.id,email,oldPassword,newPassword,navigate);
	};

	return (
		<div className='setting-page-wrapper'>
			<Image
				cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
				publicId={mainUserData.avatarPublicId}
				className='avatar-icon'
			/>
			<span className='user-nickname'>{mainUserData.nickname}</span>
			<form className='settings-form' onSubmit={onSubmitFormHandler}>
				<div className='email-wrapper'>
					<div>{EMAIL}</div>
					<div>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='email'
						/>
					</div>
				</div>
				<div className='oldpassword-wrapper'>
					<div>{OLD_PASSWORD}</div>
					<div>
						<input
							value={oldPassword}
							onChange={e => setOldPassword(e.target.value)}
							placeholder='********'
						/>
					</div>
				</div>
				<div className='newpassword-wrapper'>
					<div>{NEW_PASSWORD}</div>
					<div>
						<input
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							placeholder='new password'
						/>
					</div>
				</div>
				<div className='image-picker-wrapper'>
					<ImagePicker
						setPickedImageUrl={setPickedImageUrl}
						setImageSelected={setImageSelected}
						imageSelected={imageSelected}
					/>
					{pickedImageUrl && (
						<div className='picked-image'>
							<img src={`${pickedImageUrl}`} alt='' />
						</div>
					)}
				</div>
				<Button className='save-changes' type='submit' variant='contained'>
					{SAVE_CHANGES}
				</Button>
				<KeyboardReturnIcon style={{cursor:'pointer'}} onClick={()=>navigate(-1)}/>
			</form>
			<ToastContainer
				position='top-right'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default SettingsPage;