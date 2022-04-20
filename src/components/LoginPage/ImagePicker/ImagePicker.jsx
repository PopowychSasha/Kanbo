
import { Button } from '@mui/material';
import './ImagePicker.scss';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const ImagePicker = ({setPickedImageUrl,setImageSelected,imageSelected})=>{
  return(
    
    <div className='image-picker'>
          <Button component='label' variant='outlined' color='secondary'>
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
          {imageSelected ? (
            <AddAPhotoIcon style={{ color: 'green' }} />
          ) : (
            <AddAPhotoIcon />
          )}
        </div>
    
  )
}

export default ImagePicker;