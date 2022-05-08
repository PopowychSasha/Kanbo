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
import { EMAIL, INVALIDE_GMAIL_FORMAT, NICKNAME, ONLY_LETTERS_AND_NUMERS, PASSWORD, REQUIRE_FOR_PASSWORD } from '../../../constants/LoginPage';

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
					{NICKNAME}
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
						{ONLY_LETTERS_AND_NUMERS}
					</p>
				)}
			</FormControl>
			<FormControl variant='standard'>
				<InputLabel error={emailError ? true : false} htmlFor='email'>
					{EMAIL}
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
					<p style={{ color: 'red', fontSize: '12px' }}>{INVALIDE_GMAIL_FORMAT}</p>
				)}
			</FormControl>
			<FormControl variant='standard'>
				<InputLabel
					error={passwordError ? true : false}
					htmlFor='standard-adornment-password'>
					{PASSWORD}
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
						{REQUIRE_FOR_PASSWORD}
					</p>
				)}
			</FormControl>
		</div>
	);
};

export default SignUpFormFields;
