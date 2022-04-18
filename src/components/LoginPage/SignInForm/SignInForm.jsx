import './SignInForm.scss';

import { useState } from 'react';

import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import { Visibility,VisibilityOff} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authDataCreator } from '../../../redux/actionCreators/authDataCreator';
import { useNavigate } from 'react-router-dom';

const SignInForm = ({formsToggle})=>{
  const[isEysClosed,setIsEysClosed] = useState();
  const[nickname,setNickname] = useState('');
  const[password,setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onChangeNicknameHandler = (e)=>{
    setNickname(e.target.value);
  }
  const onChangePasswordHandler = (e)=>{
    setPassword(e.target.value);
  }

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    axios.post('/api/auth/signin',{nickname,password})
    .then(data=>{
        dispatch(authDataCreator({isLogIn:true,token:data.token}));
        navigate('/boards');
    })
    .catch(err=>console.log(err.message))

    setNickname('');
    setPassword('');
  }

  const toggleShowPasswordHandler = () => setIsEysClosed(isEysClosed=>!isEysClosed);
  
  return(
    <div className='sign-in-form-wrapper'>
        <div className='sign-in-form-title'>SignIn</div>
        <form className='sign-in-form' onSubmit={onSubmitHandler}>
            <FormControl variant="standard">
                <InputLabel htmlFor="nickname">nickname</InputLabel>
                <Input
                    id="nickname"
                    onChange={onChangeNicknameHandler}
                    value={nickname}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton>
                            <AccountCircleIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password">password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    onChange={onChangePasswordHandler}
                    value={password}
                    type={isEysClosed ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPasswordHandler}
                            >
                            {isEysClosed ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <Button type="submit" className='sign-in-btn' variant="outlined" color="secondary">Sign In</Button>
        </form>
        <div onClick={formsToggle} className="dont-have-account">Don't have an account ?</div>
    </div>
  )
}

export default SignInForm;