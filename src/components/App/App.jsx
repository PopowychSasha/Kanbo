import './App.scss';
     
import {Navigate, Route, Routes} from 'react-router-dom';

import GetStartedPage from '../../pages/StartedPage/Started';

const App = ()=>{
  return(
    <Routes>
        <Route path="/" element={<GetStartedPage/>}/>
        <Route
            path="*"
            element={<Navigate to="/" />}
        />
    </Routes>
  )
}

export default App;