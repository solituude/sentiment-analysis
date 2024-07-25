import {
    SET_ART_DATA, SET_CSAT_DATA,
    SET_DAYS_CHART_DATA,
    SET_DIALOGS_CHART_DATA, SET_FRT_DATA, SET_INDEX_OF_LAST_DISPLAYED_ITEM, SET_IS_FETCHING, SET_LABELS_DATA,
    SET_MONTHS_CHART_DATA, SET_SELECTED_DATES, SET_SELECTED_ONE_DATE, SET_SENTIMENT_DATA,
    SET_WEEKS_CHART_DATA, SET_YEARS_CHART_DATA
} from "../../constants/chartReducerConstants";

const initialState = {
    dialogsChartData: [], // все исходные данные с чатов
    daysChartData: {}, // данные, сгруппированные по дням (тут все метрики)
    weeksChartData: {}, // данные, сгруппированные по неделям (тут все метрики)
    monthsChartData: {}, // данные, сгруппированные по месяцам (тут все метрики)
    yearsChartData: {}, // данные, сгруппированные по годам (тут все метрики)

    sentimentData: [], // данные для графика тональности
    ARTData: [], // данные для графика ART
    FRTData: [], // данные для графика FRT
    CSATData: [], // данные для графика CSAT
    labelsData: [], // данные для осей графика

    selectedDates: [], // выбранные даты
    selectedOneDate: [], // выбранная дата

    isFetching: false, // флаг загрузки, вычисления
}
initialState.indexOfLastDisplayedItem = initialState.sentimentData.length - 1; // индекс последней визуализируемой точки на графиках

// сеттеры для изменения состояния
export const chartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALOGS_CHART_DATA: return {...state, dialogsChartData: action.dialogsChartData};
        case SET_DAYS_CHART_DATA: return {...state, daysChartData: action.daysChartData};
        case SET_WEEKS_CHART_DATA: return {...state, weeksChartData: action.weeksChartData};
        case SET_MONTHS_CHART_DATA: return {...state, monthsChartData: action.monthsChartData};
        case SET_YEARS_CHART_DATA: return {...state, yearsChartData: action.yearsChartData};

        case SET_SENTIMENT_DATA: return {...state, sentimentData: action.sentimentData};
        case SET_ART_DATA: return {...state, ARTData: action.ARTData};
        case SET_FRT_DATA: return {...state, FRTData: action.FRTData};
        case SET_CSAT_DATA: return {...state, CSATData: action.CSATData};
        case SET_LABELS_DATA: return {...state, labelsData: action.labelsData};

        case SET_SELECTED_DATES: return {...state, selectedDates: action.selectedDates};
        case SET_SELECTED_ONE_DATE: return {...state, selectedOneDate: action.selectedOneDate};

        case SET_INDEX_OF_LAST_DISPLAYED_ITEM: return {...state, indexOfLastDisplayedItem: action.indexOfLastDisplayedItem};

        case SET_IS_FETCHING: return {...state, isFetching: action.isFetching};
        default: return state;
    }
}