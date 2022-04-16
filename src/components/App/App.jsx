import './App.scss';
     
import {Navigate, Route, Routes} from 'react-router-dom';

import StartedPage from '../../pages/StartedPage/StartedPage';
import LoginPage from '../../pages/LoginPage/LoginPage';

const App = ()=>{
  return(
    <Routes>
        <Route path="/" element={<StartedPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route
            path="*"
            element={<Navigate to="/" />}
        />
    </Routes>
  )
}

export default App;