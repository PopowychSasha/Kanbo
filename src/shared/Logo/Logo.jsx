import './Logo.scss';
import logo from '../../images/logo.png';

const Logo = ()=>{
  return(
    <div className='logo-wrapper'>
        <img className='logo-icon' src={logo} alt=""/>
        <h2 className='logo-text'>Kanbo</h2>
    </div>
  )
}

export default Logo;