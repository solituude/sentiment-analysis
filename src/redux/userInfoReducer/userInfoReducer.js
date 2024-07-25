import {SET_EMAIL, SET_IS_FETCHING, SET_NAME, SET_PHONE, SET_ROLE} from "../../constants/userInfoReducerConstants";


const initialState = {
    isFetching: false,

    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    phone: localStorage.getItem('phone'),
    role: localStorage.getItem('role')
};

export const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {...state, name: action.name};
        case SET_PHONE:
            return {...state, phone: action.phone};
        case SET_EMAIL:
            return {...state, email: action.email};
        case SET_ROLE:
            return {...state, role: action.role};
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};

        default: return state;
    }
}