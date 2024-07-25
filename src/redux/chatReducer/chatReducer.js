import {
    SET_CLIENT_ID, ADD_MESSAGE,
    SET_CLIENT_INFO, SET_DIALOG_STATUS,
    SET_SOCKET, RESET_CHAT_STATE, SET_IS_FETCHING,
    SET_LIST_OF_CLIENTS
} from '../../constants/chatReducerConstants'

const initialState = {
    clientID: null, // ID клиента, с которым общаемся
    prevClientID: null, // ID предыдущего прользователя
    socket: null, // сокет
    messages: [], // список сообщений
    clientInfo: '', // данные о клиенте
    dialogStatus: false, // статус диалога
    listOfClients: [],
    isFetching: false,
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return { ...state, socket: action.payload };
        case SET_CLIENT_ID:
            return { ...state, clientID: action.payload, prevClientID: state.clientID };
        case ADD_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload] };
        case SET_CLIENT_INFO:
            return { ...state, clientInfo: action.payload };
        case SET_DIALOG_STATUS:
            return { ...state, dialogStatus: action.payload };
        case SET_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case SET_LIST_OF_CLIENTS:
            return { ...state, listOfClients: action.payload };
        case RESET_CHAT_STATE:
            return initialState;
        default:
            return state;
    }
};