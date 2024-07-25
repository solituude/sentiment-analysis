import {SET_EMAIL, SET_IS_FETCHING, SET_NAME, SET_PHONE} from "../../constants/userInfoReducerConstants";
import {infoAPI} from "../../api/infoAPI";

const setName = (name) => ({type: SET_NAME, name});
const setPhone = (phone) => ({type: SET_PHONE, phone});
const setEmail = (email) => ({type: SET_EMAIL, email});


export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});

export const requestUserInfo = () => async (dispatch) => {
    dispatch(setIsFetching(true));

    const response = await infoAPI.getPersonalInfo();
    if (response.status === 200) {
        let data = response.json();
        data.then(res => {
            dispatch(setName(`${res.name} ${res.patronymic} ${res.sur_name}`));
            dispatch(setEmail(res.email));
            dispatch(setPhone(res.phone_number))
        })

        dispatch(setIsFetching(false));
    } else {
        console.log(response)
        dispatch(setIsFetching(false));
    }
}
