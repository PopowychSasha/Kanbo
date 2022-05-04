import { Image } from 'cloudinary-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from '../../components/LoginPage/ImagePicker/ImagePicker';
import { asyncAccountDataCreator } from '../../redux/actionCreators/accountData';
import axios from 'axios';
import './SettingsPage.scss';

const SettingsPage = () => {
	const mainUserData = useSelector(store => store.accountDataReducer);
  const [pickedImageUrl, setPickedImageUrl] = useState('');
  const [imageSelected, setImageSelected] = useState({});

	const dispatch = useDispatch();

  const[nickname,setNickname] = useState('');
  const[email,setEmail]= useState('');

  console.log(mainUserData);

	useEffect(() => {
		dispatch(asyncAccountDataCreator());
	}, []);

  const onSubmitFormHandler = event => {
		event.preventDefault();

		/* const isFormDataValid =
			nickname !== '' &&
			email !== '' &&
			password !== '' &&
			nicknameError === false &&
			emailError === false &&
			passwordError === false;

		if (isFormDataValid === false) {
			toast.info('data in the form is not valid ');
			return;
		} else if (!imageSelected) {
			toast.info('avatar not selected');
			return;
		}
		setIsLoader(true); */

		const formData = new FormData();
		formData.append('file', imageSelected);
		formData.append('upload_preset', 'yb6djiab');
   
		axios
			.post(`https://api.cloudinary.com/v1_1/dgle2qeqp/image/upload`, formData)
			.then((responce) => {
				axios.post('/api/change/account',{
          id:mainUserData.id,
          nickname:nickname,
          email:email,
          avatarPublicId:responce.data.public_id,
         })
         .then(res=>console.log(res))
         .catch(err=>console.log(err.message))
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
			<div className='settings-title'>Main information</div>
			<form className='settings-form' onSubmit={onSubmitFormHandler}>
				<div className='nickname-wrapper'>
					<div>Nickname</div>
					<div>
						<input value={nickname || mainUserData.nickname} onChange={(e)=>setNickname(e.target.value)}/>
					</div>
				</div>
				<div className='email-wrapper'>
					<div>Email</div>
					<div>
						<input value={email || mainUserData.email} onChange={(e)=>setEmail(e.target.value)}/>
					</div>
				</div>
				<div className='password-title'>Change password</div>
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
				
				<input type='submit' />
			</form>
		</div>
	);
};

export default SettingsPage;
