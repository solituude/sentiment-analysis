import { thunk } from "redux-thunk"
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux";
import { userInfoReducer } from "./userInfoReducer/userInfoReducer";
import { chartReducer } from './chartsReducer/chartReducer';
import { authReducer } from "./authReducer/authReducer";
import { metricsReducer } from "./metricsReducer/metricsReducer";
import { chatReducer } from "./chatReducer/chatReducer";

const reducers = combineReducers({
    customAuth: authReducer,
    chart: chartReducer,
    metrics: metricsReducer,
    userInfo: userInfoReducer,
    chat: chatReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
))

window.store = store