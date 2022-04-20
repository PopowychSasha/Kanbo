import './SignInForm.scss';
import { useState } from 'react';
import {
	Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { authDataCreator } from '../../../redux/actionCreators/authDataCreator';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postSignInUserData } from '../../../utils/postSignInUserData';
import SignInFormFields from '../SignInFormFields/SignInFormFields';

const SignInForm = ({ formsToggle }) => {
	const [isEysClosed, setIsEysClosed] = useState(false);
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChangeNicknameHandler = e => {
		setNickname(e.target.value);
	};
	const onChangePasswordHandler = e => {
		setPassword(e.target.value);
	};

	const onSubmitHandler = event => {
		event.preventDefault();
		if (nickname === '' || password === '') {
			toast.info('you must input nickname and password');
			return;
		}
		postSignInUserData(nickname,password,dispatch,authDataCreator,navigate,setNickname,setPassword,toast);
	};

	const toggleShowPasswordHandler = () => setIsEysClosed(() => setIsEysClosed(isEysClosed=>!isEysClosed));

	return (
		<div className='sign-in-form-wrapper'>
			<h3 className='sign-in-form-title'>SignIn</h3>
			<form className='sign-in-form' onSubmit={onSubmitHandler}>
				<SignInFormFields onChangeNicknameHandler={onChangeNicknameHandler}
                    nickname={nickname} onChangePasswordHandler={onChangePasswordHandler}
                    password={password} isEysClosed={isEysClosed} toggleShowPasswordHandler={toggleShowPasswordHandler}
                />
				<Button
					type='submit'
					className='sign-in-btn'
					variant='outlined'
					color='secondary'>
					Sign In
				</Button>
			</form>
			<div onClick={formsToggle} className='dont-have-account'>
				Don&apos;t have an account ?
			</div>
			<ToastContainer
				position='top-right'
				autoClose={1500}
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

export default SignInForm;
