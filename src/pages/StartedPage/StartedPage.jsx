import './StartedPage.scss';

import MainImage from '../../components/GetStartedPage/MainImage/MainImage';
import Text from '../../components/GetStartedPage/Text/Text';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const StartedPage = ()=>{
  return(
    <div className="page-wrapper">
        <div className="content-wrapper">
            <div className="description">
                <Text/>
                <MainImage/>
            </div>
            <Link to="/login">
                <Button className="get-started-btn" variant="outlined" color="secondary">Get Started</Button>
            </Link>
        </div>
    </div>
  )
}

export default StartedPage;