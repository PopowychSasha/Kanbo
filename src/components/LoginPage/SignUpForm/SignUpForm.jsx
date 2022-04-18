import './SignUpForm.scss';

import { useState } from 'react';

import { Backdrop, Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authDataCreator } from '../../../redux/actionCreators/authDataCreator';
import {useNavigate} from 'react-router-dom';

const SignUpForm = ({formsToggle})=>{
  const[isEysClosed,setIsEysClosed] = useState();
  
  const[nickname,setNickname] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  
  const[isLoader,setIsLoader] = useState(false);
  
  const[imageSelected,setImageSelected] = useState();

  const onChangeNicknameHandler = (e)=>setNickname(e.target.value);
  const onChangeEmailHandler = (e)=>setEmail(e.target.value);
  const onChangePasswordHandler = (e)=>setPassword(e.target.value);

  const toggleShowPasswordHandler = () => setIsEysClosed(isEysClosed=>!isEysClosed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitFormHandler = (event)=>{
    event.preventDefault();

    setIsLoader(true);

    const formData = new FormData();
    formData.append("file",imageSelected);
    formData.append("upload_preset","yb6djiab");
    
    axios.post("https://api.cloudinary.com/v1_1/dgle2qeqp/image/upload",formData)
    .then(responce=>{
        axios.post('/api/auth/signup',{
            nickname,email,password,avatarPublicId:responce.data.public_id
         })
         .then(data=>{
             dispatch(authDataCreator({isLogIn:true,token:data.data.token}));
             navigate('/boards');
             setIsLoader(false);
         })
         .catch(err=>console.log(err.message))
    })
    .catch(err=>console.log('Cloudinary error'))

    setNickname('');
    setEmail('');
    setPassword('');
  }

 
  
  const userData = useSelector(store=>store.userReducer)
  console.log(userData);

  return(
    <div className='sign-up-form-wrapper'>
        {isLoader && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
        <div className='sign-up-form-title'>SignUp</div>
        <form className='sign-up-form'
              onSubmit={onSubmitFormHandler}>
            <FormControl variant='standard'>
                <InputLabel htmlFor="nickname">nickname</InputLabel>
                <Input
                    id='nickname'
                    value={nickname}
                    onChange={onChangeNicknameHandler}
                    endAdornment={
                    <InputAdornment position='end'>
                        <IconButton>
                            <AccountCircleIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl variant='standard'>
                <InputLabel htmlFor="email">email</InputLabel>
                <Input
                    id="email"
                    value={email}
                    onChange={onChangeEmailHandler}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton>
                            <EmailIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password">password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    value={password}
                    onChange={onChangePasswordHandler}
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
            {
                <div className='image-picker' >
                    <Button component="label" variant="outlined" color="secondary">
                        Upload Image
                        <input
                            type="file"
                            hidden
                            onChange={(event)=>{
                                setImageSelected(event.target.files[0]);
                            }}
                        />
                        </Button>
                    {imageSelected ? <AddAPhotoIcon style={{color:'green'}}/>
                    :<AddAPhotoIcon/>}
                </div>
            }
            <Button type="submit" className='sign-in-btn' variant="contained" color="secondary">Sign Up</Button>
        </form>
        <div onClick={formsToggle} className="dont-have-account">I already have an account</div>
    </div>
  )
}

export default SignUpForm;