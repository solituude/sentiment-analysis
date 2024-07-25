import {
    SET_AVERAGE_TIME,
    SET_AVG_PROCESSING_TIME,
    SET_COUNT_DISPLAYED_METRICS,
    SET_CURRENT_AVERAGE_SENTIMENT,
    SET_CURRENT_AVERAGE_TIME,
    SET_IS_FETCHING, SET_NTB,
    SET_QUANTITY_OF_DIALOGS,
    SET_SHOW_INFO, SET_SLA, SET_SLA_FOR_ART, SET_SLA_FOR_FRT,
    SET_UNFINISHED_DIALOGS
} from "../../constants/metricsReducerConstants";

const initialState = {
    currentAverageSentiment: 0,
    currentAverageTime: 0,
    currentAverageFirstRequestTime: 0,
    quantityOfDialogs: 0,
    unfinishedDialogs: 0,
    averageTime: 0,
    avgProcessingTime: 0,
    chartSettings: localStorage.getItem('chartSettings'),
    chartSettingsParse: JSON.parse(localStorage.getItem('chartSettings')),
    NTB: 'Нет данных',
    SLA: {
        forFRT: {breachedTime: 'Нет данных', onTime: 'Нет данных'},
        forART: {breachedTime: 'Нет данных', onTime: 'Нет данных'},
    },

    countDisplayedMetrics: 0,

    isFetching: false,
}

initialState.showInfo = {
    meanSentiment: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showMeanSentiment) : true,
    meanTime: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showMeanTime) : true,
    sentiment: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showSentiment) : true,
    NTB: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showNTB) : true,
    FRT: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showFRT) : true,
    quantityStat: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showQuantityStat) : true,
    ART: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showART) : true,
    NPS: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showNPS) : true,
    SLA: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showSLA) : true,
    CSAT: initialState.chartSettings !== null ? Boolean(initialState.chartSettingsParse.showCSAT) : true,
}

export const metricsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING: return {...state, isFetching: action.isFetching};
        case SET_QUANTITY_OF_DIALOGS: return {...state, quantityOfDialogs: action.quantityOfDialogs};
        case SET_UNFINISHED_DIALOGS: return {...state, unfinishedDialogs: action.unfinishedDialogs};
        case SET_AVERAGE_TIME: return {...state, averageTime: action.averageTime};
        case SET_AVG_PROCESSING_TIME: return {...state, avgProcessingTime: action.avgProcessingTime};
        case SET_CURRENT_AVERAGE_SENTIMENT: return {...state, currentAverageSentiment: action.currentAverageSentiment};
        case SET_CURRENT_AVERAGE_TIME: return {...state, currentAverageTime: action.currentAverageTime};
        case SET_NTB: return {...state, NTB: action.NTB};
        case SET_SLA: return {...state, SLA: action.SLA};
        case SET_SLA_FOR_ART: return {
            ...state,
            SLA: {...state.SLA, forART: action.forART}
        };
        case SET_SLA_FOR_FRT: return {
            ...state,
            SLA: {...state.SLA, forFRT: action.forFRT}
        }

        case SET_SHOW_INFO: return {...state, showInfo: action.showInfo};
        case SET_COUNT_DISPLAYED_METRICS: return {...state, countDisplayedMetrics: action.countDisplayedMetrics};
        default: return state;
    }
}