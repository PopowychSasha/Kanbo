import './LoginPage.scss';

import SignInForm from '../../components/LoginPage/SignInForm/SignInForm';

import man from '../../images/man.png';

const LoginPage = ()=>{
  return(
    <div className='login-page-wrapper'>
        <img src={man} alt=""/>
        <SignInForm/>
    </div>
  )
}

export default LoginPage;