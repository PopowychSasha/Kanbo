import './SignInForm.scss';

import { useState } from 'react';

import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import { Visibility,VisibilityOff} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SignInForm = ({formsToggle})=>{
  
  const[isEysClosed,setIsEysClosed] = useState();

  const toggleShowPasswordHandler = () => setIsEysClosed(isEysClosed=>!isEysClosed);
  
  return(
    <div className='sign-in-form-wrapper'>
        <div className='sign-in-form-title'>SignIn</div>
        <form className='sign-in-form'>
            <FormControl variant="standard">
                <InputLabel htmlFor="nickname">nickname</InputLabel>
                <Input
                    id="nickname"
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
            <Button className='sign-in-btn' variant="outlined" color="secondary">Sign In</Button>
        </form>
        <div onClick={formsToggle} className="dont-have-account">Don't have an account ?</div>
    </div>
  )
}

export default SignInForm;