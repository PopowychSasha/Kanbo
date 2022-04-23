import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './HeaderDropDown.scss';
import { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeAccountDataCreator } from '../../redux/actionCreators/accountData';
import { useNavigate } from 'react-router-dom';

const HeaderDropDown = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    dispatch(removeAccountDataCreator());
    axios.get('/api/logout')
    .then(res=>console.log(res.data))
    navigate('/');
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 40 }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ width: 40, }}
        >
          
          <MenuItem onClick={logoutHandler} sx={{ width: 200,display:'flex',justifyContent:'space-between' }}><div>exit</div><ExitToAppIcon/> </MenuItem>
        </Select>
      </FormControl>

    </div>
  );
}

export default HeaderDropDown;