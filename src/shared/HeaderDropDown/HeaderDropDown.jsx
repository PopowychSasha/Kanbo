import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import { removeAccountDataCreator } from '../../redux/actionCreators/accountData';
import CreateBoardModal from '../../components/BoardsPage/CreateBoardModal/CreateBoardModal';
import './HeaderDropDown.scss';
import { CREATE_BOARD, EXIT, SETTINGS } from '../../constants/Shared';

const HeaderDropDown = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    dispatch(removeAccountDataCreator());
    axios.get('/api/logout')
    .then(res=>console.log(res.data))
    navigate('/');
  }

  const [openCreateBoardModal, setOpenCreateBoardModal] = useState(false);

  const handleClickOpen = () => {
    navigate('/boards');
    setOpenCreateBoardModal(true);
  };

  const handleClickClose = () => {
    setOpenCreateBoardModal(false);
  };

  const goToSettingHandler = ()=>{
    navigate('/account/settings');
  }

  return (
    <div>
      <FormControl  sx={{ m: 1, width: 40 }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          sx={{ width: 40}}
        >
          <MenuItem onClick={handleClickOpen} sx={{ width: 200,display:'flex',justifyContent:'space-between' }}><div>{CREATE_BOARD}</div>
            <AddCircleOutlineIcon/> 
          </MenuItem>
          <MenuItem onClick={goToSettingHandler} sx={{ width: 200,display:'flex',justifyContent:'space-between' }}><div>{SETTINGS}</div>
            <SettingsIcon/> 
          </MenuItem>
          <MenuItem onClick={logoutHandler} sx={{ width: 200,display:'flex',justifyContent:'space-between' }}><div>{EXIT}</div>
            <ExitToAppIcon/> 
          </MenuItem>
        </Select>
      </FormControl>
      {openCreateBoardModal && <CreateBoardModal handleClickClose={handleClickClose}/>}
    </div>
  );
}

export default HeaderDropDown;