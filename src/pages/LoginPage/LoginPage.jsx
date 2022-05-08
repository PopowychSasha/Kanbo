import { useState } from 'react';
import SignInForm from '../../components/LoginPage/SignInForm/SignInForm';
import SignUpForm from '../../components/LoginPage/SignUpForm/SignUpForm';
import man from '../../images/man.png';
import './LoginPage.scss';

const LoginPage = () => {
	const [isSignInFormActive, setIsSignInFormActive] = useState(true);

	const formsToggleHandler = () => {
		setIsSignInFormActive(isSignInFormActive => !isSignInFormActive);
	};

	return (
		<div className='login-page-wrapper'>
			{isSignInFormActive ? (
				<>
					<img src={man} alt='' />
					<SignInForm formsToggle={formsToggleHandler} />
				</>
			) : (
				<SignUpForm formsToggle={formsToggleHandler} />
			)}
		</div>
	);
};

export default LoginPage;
