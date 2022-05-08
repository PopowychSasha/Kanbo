import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import MainImage from '../../components/GetStartedPage/MainImage/MainImage';
import Text from '../../components/GetStartedPage/Text/Text';
import './StartedPage.scss';
import { GET_STARTED } from '../../constants/StartedPage';

const StartedPage = () => {
	return (
		<div className='page-wrapper'>
			<div className='content-wrapper'>
				<div className='description'>
					<Text />
					<MainImage />
				</div>
				<Link to='/login'>
					<Button className='get-started-btn' variant='outlined' color='secondary'>
						{GET_STARTED}
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default StartedPage;
