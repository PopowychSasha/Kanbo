import axios from 'axios';

export const postSignUpUserData = (nickname,email,password,avatarPublicId,
    dispatch,authDataCreator,navigate,setIsLoader,setNickname,setEmail,setPassword,toast)=>{
    const conflict = 409;
    const unprocessable  = 422;

    axios
    .post('/api/auth/signup', {
        nickname,
        email,
        password,
        avatarPublicId
    })
    .then(() => {
        dispatch(authDataCreator({ isLogIn: true }));
        navigate('/boards');
        setIsLoader(false);
        setNickname('');
        setEmail('');
        setPassword('');
    })
    .catch(err => {
        setIsLoader(false);
        if (err.response) {
            if (err.response.status === conflict) {
                toast.warning('User with this nickname already exist');
            } else if (err.response.status === unprocessable) {
                toast.warning('Form data is invalide');
            }
        }
    });
}