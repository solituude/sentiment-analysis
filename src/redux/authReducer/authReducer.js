import {SET_IS_FETCHING, SET_SUCCESSFUL_LOGIN} from "../../constants/authReducerConstants";

const initialState = {
    successfulLogin: true,
    isFetching: false,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_SUCCESSFUL_LOGIN:
            return {...state, successfulLogin: action.successfulLogin}
        default: return state;
    }
}