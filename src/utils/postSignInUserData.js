import axios from 'axios';

export const postSignInUserData = (nickname,password,dispatch,authDataCreator,navigate,setNickname,setPassword,toast)=>{
    axios
    .post('/api/auth/signin', { nickname, password })
    .then(() => {
        dispatch(authDataCreator({ isLogIn: true }));
        navigate('/boards');
        setNickname('');
        setPassword('');
    })
    .catch(err => {
        if (err.response) {
            if (err.response.status === 403) {
                toast.warning('nickname or password are invalide');
            }
        }
    });
}