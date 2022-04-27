import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Logo.scss';

const Logo = () => {
	return (
		<Link to='/boards'>
			<div className='logo-wrapper'>
				<img className='logo-icon' src={logo} alt='' />
				<h2 className='logo-text'>Kanbo</h2>
			</div>
		</Link>
	);
};

export default Logo;
