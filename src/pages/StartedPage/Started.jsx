import './StartedPage.scss';

import MainImage from '../../components/GetStartedPage/MainImage/MainImage';
import Text from '../../components/GetStartedPage/Text/Text';

import Button from '@mui/material/Button';

const GetStartedPage = ()=>{
  return(
    <div className="page-wrapper">
        <div className="content-wrapper">
            <div className="description">
                <Text/>
                <MainImage/>
            </div>
            <Button className="get-started-btn" variant="outlined" color="secondary">Get Started</Button>
        </div>
    </div>
  )
}

export default GetStartedPage;