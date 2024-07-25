import {customauthAPI} from "../../api/customauthAPI";
import {SET_SUCCESSFUL_LOGIN, SET_IS_FETCHING} from "../../constants/authReducerConstants";
import {infoAPI} from "../../api/infoAPI";


const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});
const setSuccessfulLogin = (successfulLogin) => ({type: SET_SUCCESSFUL_LOGIN, successfulLogin});


export const requestLogin = (data) => async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await customauthAPI.logIn(data);

    console.log(response);
    if (response.status === 200) {
        dispatch(setSuccessfulLogin(true));
        let data = response.json();
        data.then(res => {
            localStorage.setItem('token', res.token);
        })


        const responseUserInfo = await infoAPI.getPersonalInfo();
        const dataUserInfo = responseUserInfo.json();
        dataUserInfo.then(res => {
            localStorage.setItem('email', res.email);
            localStorage.setItem('name', `${res.name} ${res.patronymic} ${res.sur_name}`);
            localStorage.setItem('phone', res.phone_number);
        });

        const responseRole = await customauthAPI.getRole();
        const dataRole = responseRole.json();
        dataRole.then(res => localStorage.setItem('role', res.role));
        window.location.href = '/';
        dispatch(setIsFetching(false));
        return true;
    } else {
        dispatch(setSuccessfulLogin(false));
        dispatch(setIsFetching(false));
        return false;
    }
}