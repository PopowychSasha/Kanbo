import { Button } from '@mui/material';
import { UPLOAD_IMAGE } from '../../../constants/LoginPage';
import './ImagePicker.scss';

const ImagePicker = ({ setPickedImageUrl, setImageSelected }) => {
	return (
		<div className='image-picker'>
			<Button
				component='label'
				variant='outlined'
				color='secondary'
				sx={{ width: 150, height: 50 }}>
				{UPLOAD_IMAGE}
				<input
					type='file'
					hidden
					onChange={event => {
						setPickedImageUrl(URL.createObjectURL(event.target.files[0]));
						setImageSelected(event.target.files[0]);
					}}
				/>
			</Button>
		</div>
	);
};

export default ImagePicker;
