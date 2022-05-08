import axios from 'axios';
import { toast } from 'react-toastify';

export const changeUserData = (
	formData,
	id,
	email,
	oldPassword,
	newPassword,
	navigate,
) => {
	axios
		.post(`https://api.cloudinary.com/v1_1/dgle2qeqp/image/upload`, formData)
		.then(responce => {
			axios
				.post('/api/change/account', {
					id: id,
					email: email,
					avatarPublicId: responce.data.public_id,
					oldPassword: oldPassword,
					newPassword: newPassword,
				})
				.then(res => {
					toast.success('You update account successful');
					setTimeout(() => {
						navigate(-1);
						console.log(res);
					}, 2000);
				})
				.catch(() => {
					toast.error('Password is invalide');
				});
		})
		.catch(() => {
			toast.info('Avatar is not selected');
		});
};
