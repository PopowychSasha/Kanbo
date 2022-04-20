
export const onChangeNicknameHandler = (setNicknameError,setNickname,e) => {
    const regexForNickname = /^[А-Яа-яA-Za-z0-9_-і]*$/;
    if (e.target.value.match(regexForNickname) && e.target.value !== '') {
        setNicknameError(false);
    } else {
        setNicknameError(true);
    }
    setNickname(e.target.value);
};


export const onChangeEmailHandler = (setEmailError,setEmail,e) => {
    const regexForEmail =
        /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
    if (e.target.value.match(regexForEmail)) {
        setEmailError(false);
    } else {
        setEmailError(true);
    }
    setEmail(e.target.value);
};

export const onChangePasswordHandler = (setPasswordError,setPassword,e) => {
    const regexForPassword =
        /^(?=.*[А-Яа-яA-Za-zі])(?=.*\d)(?=.*[@$!%*#?&])[А-Яа-яA-Za-zі\d@$!%*#?&]{8,}$/;
    if (e.target.value.match(regexForPassword)) {
        setPasswordError(false);
    } else {
        setPasswordError(true);
    }
    setPassword(e.target.value);
};