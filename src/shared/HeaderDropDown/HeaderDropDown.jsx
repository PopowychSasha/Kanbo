import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { removeAccountDataCreator } from '../../redux/actionCreators/accountData';
import CreateBoardModal from '../../components/BoardsPage/CreateBoardModal/CreateBoardModal';
import './HeaderDropDown.scss';

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

  return (
    <div>
      <FormControl  sx={{ m: 1, width: 40 }}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          sx={{ width: 40}}
        >
          <MenuItem onClick={handleClickOpen} /* onClick={logoutHandler} */ sx={{ width: 200,display:'flex',justifyContent:'space-between' }}><div>create board</div>
            <AddCircleOutlineIcon/> 
          </MenuItem>
          <MenuItem onClick={logoutHandler} sx={{ width: 200,display:'flex',justifyContent:'space-between' }}><div>exit</div>
            <ExitToAppIcon/> 
          </MenuItem>
        </Select>
      </FormControl>
      {openCreateBoardModal && <CreateBoardModal handleClickClose={handleClickClose}/>}
    </div>
  );
}

export default HeaderDropDown;