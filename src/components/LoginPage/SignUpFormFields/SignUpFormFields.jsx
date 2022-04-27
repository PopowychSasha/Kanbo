import {
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './SignUpFormFields.scss';

const SignUpFormFields = ({
	nicknameError,
	nickname,
	onChangeNicknameHandler,
	setNicknameError,
	setNickname,
	emailError,
	email,
	passwordError,
	password,
	onChangeEmailHandler,
	isEysClosed,
	toggleShowPasswordHandler,
	onChangePasswordHandler,
	setPasswordError,
	setPassword,
	setEmailError,
	setEmail,
}) => {
	return (
		<div className='form-fields'>
			<FormControl variant='standard'>
				<InputLabel error={nicknameError ? true : false} htmlFor='nickname'>
					nickname
				</InputLabel>
				<Input
					id='nickname'
					error={nicknameError ? true : false}
					value={nickname}
					onChange={e => onChangeNicknameHandler(setNicknameError, setNickname, e)}
					style={{ color: `${nicknameError ? 'red' : 'black'}` }}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton>
								<AccountCircleIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
				{nicknameError && (
					<p style={{ color: 'red', fontSize: '12px' }}>
						must be only letters and numbers
					</p>
				)}
			</FormControl>
			<FormControl variant='standard'>
				<InputLabel error={emailError ? true : false} htmlFor='email'>
					email
				</InputLabel>
				<Input
					id='email'
					error={emailError ? true : false}
					value={email}
					onChange={e => onChangeEmailHandler(setEmailError, setEmail, e)}
					style={{ color: `${emailError ? 'red' : 'black'}` }}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton>
								<EmailIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
				{emailError && (
					<p style={{ color: 'red', fontSize: '12px' }}>invalide gmail format</p>
				)}
			</FormControl>
			<FormControl variant='standard'>
				<InputLabel
					error={passwordError ? true : false}
					htmlFor='standard-adornment-password'>
					password
				</InputLabel>
				<Input
					id='standard-adornment-password'
					error={passwordError ? true : false}
					value={password}
					onChange={e => onChangePasswordHandler(setPasswordError, setPassword, e)}
					style={{ color: `${passwordError ? 'red' : 'black'}` }}
					type={isEysClosed ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={toggleShowPasswordHandler}>
								{isEysClosed ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
				{passwordError && (
					<p style={{ color: 'red', fontSize: '12px' }}>
						Minimum eight characters, at least one letter, one number and one special
						character:
					</p>
				)}
			</FormControl>
		</div>
	);
};

export default SignUpFormFields;
