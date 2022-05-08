import { HELPS_MESSAGE, KANBO, KANBO_OPPORTUNITIES, TEAM_WILL_BE_SUCCEED } from '../../../constants/StartedPage';
import './Text.scss';

const Text = () => {
	return (
		<div className='text-wrapper'>
			<div className='title'>
				<span className='main-word'>{KANBO}</span> {HELPS_MESSAGE}
			</div>
			<div className='  sub-title'>
				{KANBO_OPPORTUNITIES}{' '}
				<span className='main-word'>{KANBO}</span>{TEAM_WILL_BE_SUCCEED}
			</div>
		</div>
	);
};

export default Text;
