import './LoginPage.scss';

import SignInForm from '../../components/LoginPage/SignInForm/SignInForm';

import man from '../../images/man.png';
import { useState } from 'react';
import SignUpForm from '../../components/LoginPage/SignUpForm/SignUpForm';

const LoginPage = ()=>{
  const [isSignInFormActive,setIsSignInFormActive] = useState(true);

  const formsToggleHandler = ()=>{
    setIsSignInFormActive(isSignInFormActive=>!isSignInFormActive);
  }
  return(
    <div className='login-page-wrapper'>
      {
        isSignInFormActive ? 
        <>
            <img src={man} alt=""/>
            <SignInForm formsToggle={formsToggleHandler}/>
        </>
        :
        <SignUpForm formsToggle={formsToggleHandler}/>
      }
    </div>
  )
}

export default LoginPage;