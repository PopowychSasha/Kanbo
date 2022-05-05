import { Image } from 'cloudinary-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from '../../components/LoginPage/ImagePicker/ImagePicker';
import { asyncAccountDataCreator } from '../../redux/actionCreators/accountData';
import axios from 'axios';
import './SettingsPage.scss';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const SettingsPage = () => {
	const mainUserData = useSelector(store => store.accountDataReducer);
	const [pickedImageUrl, setPickedImageUrl] = useState('');
	const [imageSelected, setImageSelected] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	console.log(mainUserData);

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

		axios
			.post(`https://api.cloudinary.com/v1_1/dgle2qeqp/image/upload`, formData)
			.then(responce => {
				axios
					.post('/api/change/account', {
						id: mainUserData.id,
						email: email,
						avatarPublicId: responce.data.public_id,
						oldPassword:oldPassword,
						newPassword:newPassword
					})
					.then(res => {
						toast.success('You update account successful');
						setTimeout(()=>{
							navigate(-1);
							console.log(res);
						},2000)
					})
					.catch(() => {
						toast.error('Password is invalide');
					});
			})
			.catch(() => console.log('Cloudinary error'));
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
					<div>Email</div>
					<div>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='email'
						/>
					</div>
				</div>
				<div className='oldpassword-wrapper'>
					<div>OldPassword</div>
					<div>
						<input
							value={oldPassword}
							onChange={e => setOldPassword(e.target.value)}
							placeholder='********'
						/>
					</div>
				</div>
				<div className='newpassword-wrapper'>
					<div>NewPassword</div>
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
					Save changes
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
