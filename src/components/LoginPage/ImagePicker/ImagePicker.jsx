
import { Button } from '@mui/material';
import './ImagePicker.scss';

const ImagePicker = ({setPickedImageUrl,setImageSelected})=>{
  return(
    
    <div className='image-picker'>
          <Button component='label' variant='outlined' color='secondary' sx={{ width: 150,height:50 }}>
            Upload Image
            <input
              type='file'
              hidden
              onChange={event => {
                console.log(event.target.files[0].name);
                setPickedImageUrl(URL.createObjectURL(event.target.files[0]));
                setImageSelected(event.target.files[0]);
              }}
            />
          </Button>
    </div>
  )
}

export default ImagePicker;