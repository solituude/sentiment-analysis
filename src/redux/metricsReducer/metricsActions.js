import {metricsAPI} from "../../api/metricsAPI";
import {
    SET_QUANTITY_OF_DIALOGS,
    SET_IS_FETCHING,
    SET_AVG_PROCESSING_TIME,
    SET_UNFINISHED_DIALOGS,
    SET_CURRENT_AVERAGE_SENTIMENT,
    SET_CURRENT_AVERAGE_TIME,
    SET_COUNT_DISPLAYED_METRICS, SET_SHOW_INFO, SET_NTB, SET_SLA_FOR_ART, SET_SLA_FOR_FRT
} from "../../constants/metricsReducerConstants";

const setQuantityOfDialogs = (quantityOfDialogs) => ({type: SET_QUANTITY_OF_DIALOGS, quantityOfDialogs});
const setAvgProcessingTime = (avgProcessingTime) => ({type: SET_AVG_PROCESSING_TIME, avgProcessingTime});
const setUnfinishedDialogs = (unfinishedDialogs) => ({type: SET_UNFINISHED_DIALOGS, unfinishedDialogs});
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});
const setCurrentAverageSentiment = (currentAverageSentiment) => ({type: SET_CURRENT_AVERAGE_SENTIMENT, currentAverageSentiment});
const setCurrentAverageTime = (currentAverageTime) => ({type: SET_CURRENT_AVERAGE_TIME, currentAverageTime});
const setCountDisplayedMetrics = (countDisplayedMetrics) => ({type: SET_COUNT_DISPLAYED_METRICS, countDisplayedMetrics});
const setShowInfo = (showInfo) => ({type: SET_SHOW_INFO, showInfo});
const setNTB = (NTB) => ({type: SET_NTB, NTB});
// const setSLA = (SLA) => ({type: SET_SLA, SLA});
const setSLAforART = (forART) => ({type: SET_SLA_FOR_ART, forART});
const setSLAforFRT = (forFRT) => ({type: SET_SLA_FOR_FRT, forFRT});

export const requestQuantityOfDialogs = () => async(dispatch) => {
    dispatch(setIsFetching(true));
    const response = await metricsAPI.getCountOfDialogs();
    if (response.status === 200) {
        const data = response.json();
        data.then(res => {
            // console.log(res)
            dispatch(setQuantityOfDialogs(res.countOfDialogs));
        })
    } else {
        dispatch(setQuantityOfDialogs('Нет данных'));
    }
    dispatch(setIsFetching(false));
}

export const requestAvgProcessingTime = () => async(dispatch) => {
    dispatch(setIsFetching(true));
    const response = await metricsAPI.getAvgProcessingTime();
    if (response.status === 200) {
        const data = response.json();
        data.then(res => {
            // console.log(res)
            dispatch(setAvgProcessingTime(res.averageTime));
        })
    } else {
        dispatch(setAvgProcessingTime('Нет данных'));
    }
    dispatch(setIsFetching(false));
}

export const requestUnfinishedDialogs = () => async(dispatch) => {
    dispatch(setIsFetching(true));
    const response = await metricsAPI.getCountOfUnfinishedDialogs();
    if (response.status === 200) {
        const data = response.json();
        data.then(res => {
            // console.log(res)
            dispatch(setUnfinishedDialogs(res.countOfUnfinishedDialogs));
        })
    } else {
        dispatch(setUnfinishedDialogs('Нет данных'));
    }
    dispatch(setIsFetching(false));
}

export const requestInfoForDialogStatistic = () => (dispatch) => {
    dispatch(requestQuantityOfDialogs());
    dispatch(requestAvgProcessingTime());
    dispatch(requestUnfinishedDialogs());
}

export const setNewCurrentAverageSentiment = (sentimentData) => (dispatch) => {
    const sum = sentimentData.reduce((part, a) => a + part, 0);
    dispatch(setCurrentAverageSentiment((sum / sentimentData.length).toFixed(0)));
}

export const setNewCurrentAverageTime = (timeData) => (dispatch) => {
    const sum = timeData.reduce((part, a) => a + part, 0);
    dispatch(setCurrentAverageTime((sum / timeData.length).toFixed(0)));
}

export const setNewShowInfo = (newShowInfo) => (dispatch) => {
    dispatch(setShowInfo(newShowInfo));
}

export const updateShowInfo = () => (dispatch, getState) => {
    const currShowInfo = getState().metrics.showInfo;
    const role = localStorage.getItem('role');
    let obj = {
        'showMeanSentiment': currShowInfo.meanSentiment,
        'showMeanTime': currShowInfo.meanTime,
        'showSentiment': currShowInfo.sentiment,
        'showNTB': currShowInfo.NTB,
        'showFRT': currShowInfo.FRT,
        'showQuantityStat': currShowInfo.quantityStat,
        'showART': currShowInfo.ART,
        'showSLA': currShowInfo.SLA,
        'showCSAT': currShowInfo.CSAT,
    };
    if (role === 'manager') {
        obj['showNPS'] = currShowInfo.NPS;
    }
    let arr = Object.values(obj);
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            count++;
        }
    }

    dispatch(setCountDisplayedMetrics(count));
    localStorage.setItem('chartSettings', JSON.stringify(obj));
}

export const requestNTB = () => async(dispatch) => {
    dispatch(setIsFetching(true));
    const response = await metricsAPI.getCountOfNumberOfTicketsBreached();
    if (response.status === 200) {
        const data = response.json();
        data.then(res => dispatch(setNTB(res.numberOfTicketsBreached)));
    } else {
        dispatch(setNTB('Нет данных'))
    }
    dispatch(setIsFetching(false));
}

export const requestSLA = () => async(dispatch) => {
    dispatch(setIsFetching(true));
    const responseFRT = await metricsAPI.getSLAforFRT();
    if (responseFRT.status === 200) {
        const data = responseFRT.json();
        data.then(res => {
            dispatch(setSLAforFRT({breachedTime: res.numberOfTicketsBreachedFRT, onTime: res.numberOfTicketsOnTimeFRT}))
        });
    } else {console.log('Ошибка при получении данных SLAforFRT')}

    const responseART = await metricsAPI.getSLAforART();
    if (responseART.status === 200) {
        const data = responseART.json();
        data.then(res => {
            dispatch(setSLAforART({breachedTime: res.numberOfTicketsBreachedART, onTime: res.numberOfTicketsOnTimeART}))
        })
    }else {console.log('Ошибка при получении данных SLAforART')}

    dispatch(setIsFetching(false));
}