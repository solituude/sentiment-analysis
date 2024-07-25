import {
  SET_CLIENT_ID, ADD_MESSAGE,
  SET_CLIENT_INFO, SET_DIALOG_STATUS,
  SET_SOCKET, RESET_CHAT_STATE, SET_IS_FETCHING,
  SET_LIST_OF_CLIENTS
} from '../../constants/chatReducerConstants'

import { chatsAPI } from '../../api/chatsAPI'

export const setClientId = (clientId) => ({ type: SET_CLIENT_ID, payload: clientId, });
export const addMessage = (message) => ({ type: ADD_MESSAGE, payload: message, });
export const setClientInfo = (clientInfo) => ({ type: SET_CLIENT_INFO, payload: clientInfo, });
export const setDialogStatus = (status) => ({ type: SET_DIALOG_STATUS, payload: status, });
export const setSocket = (status) => ({ type: SET_SOCKET, payload: status, });
export const resetChatState = () => ({ type: RESET_CHAT_STATE, });
export const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
export const setListOfClients = (clients) => ({ type: SET_LIST_OF_CLIENTS, payload: clients })

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

export const requestChatInfo = (clientID) => async (dispatch) => {
  dispatch(setIsFetching(true));
  const response = await chatsAPI.getCustomer(clientID);

  if (response.status === 200) {
    const data = await response.json();
    dispatch(setClientInfo(data));
  } else {
    console.error('Ошибка:', response.status, response.statusText);
  }

  dispatch(setIsFetching(false));
}

export const requestCheckCloseDialog = (clientID) => async (dispatch) => {
  dispatch(setIsFetching(true));
  const response = await chatsAPI.getCloseDialog(clientID);

  if (response.status === 200) {
    const data = await response.json();
    dispatch(setDialogStatus(data.active));
  } else {
    console.error('Ошибка:', response.status, response.statusText);
  }

  dispatch(setIsFetching(false));
}

export const updateCloseDialog = (clientID) => async (dispatch) => {
  dispatch(setIsFetching(true));
  const csrftoken = getCookie('csrftoken');
  const headers = { 'X-CSRFToken': csrftoken };
  const response = await chatsAPI.updateCloseDialog(clientID, headers);

  if (response.status === 200) {
    const data = await response.json();
    dispatch(setDialogStatus(data.active));
  } else {
    console.error('Ошибка:', response.status, response.statusText);
  }

  dispatch(setDialogStatus(false));
}

export const requestListOfClients = () => async (dispatch) => {
  dispatch(setIsFetching(true));
  const response = await chatsAPI.getListOfClients();

  if (response.status === 200) {
    const data = await response.json();
    dispatch(setListOfClients(data));
  } else {
    console.error('Ошибка:', response.status, response.statusText);
  }

  dispatch(setIsFetching(false));
}

export const connectWebSocket = (clientID) => (dispatch) => {
  const newSocket = new WebSocket('ws://127.0.0.1:8000/ws/' + clientID + '/');

  newSocket.onopen = () => {
    dispatch(setSocket(newSocket));
  };

  newSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    dispatch(addMessage(data));
  };

  newSocket.onclose = () => {
    dispatch(setSocket(null));
  };

  // dispatch(setSocket(newSocket));

  return newSocket;
};