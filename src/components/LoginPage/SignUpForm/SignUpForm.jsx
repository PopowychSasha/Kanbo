import './SignUpForm.scss';

import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpForm = ({formsToggle})=>{
    const[isEysClosed,setIsEysClosed] = useState();

  const toggleShowPasswordHandler = () => setIsEysClosed(isEysClosed=>!isEysClosed);
  return(
    <div className='sign-up-form-wrapper'>
        <div className='sign-up-form-title'>SignUp</div>
        <form className='sign-up-form'>
            <FormControl variant='standard'>
                <InputLabel htmlFor="nickname">nickname</InputLabel>
                <Input
                    id='nickname'
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
            <Button className='sign-in-btn' variant="outlined" color="secondary">pick avatar</Button>
            <Button className='sign-in-btn' variant="contained" color="secondary">Sign Up</Button>
        </form>
        <div onClick={formsToggle} className="dont-have-account">I already have an account</div>
    </div>
  )
}

export default SignUpForm;