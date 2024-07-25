import {
    SET_ART_DATA,
    SET_DAYS_CHART_DATA,
    SET_DIALOGS_CHART_DATA, SET_FRT_DATA, SET_INDEX_OF_LAST_DISPLAYED_ITEM, SET_IS_FETCHING, SET_LABELS_DATA,
    SET_MONTHS_CHART_DATA, SET_SELECTED_DATES, SET_SELECTED_ONE_DATE, SET_SENTIMENT_DATA,
    SET_WEEKS_CHART_DATA, SET_YEARS_CHART_DATA
} from "../../constants/chartReducerConstants";

import {chatsAPI} from "../../api/chatsAPI";
import {
    groupedDataByDays,
    groupedDataByMonths,
    groupedDataByWeeks,
    groupedDataByYears
} from "../../helpers/chartsDataHelpers";
import {setNewCurrentAverageSentiment, setNewCurrentAverageTime} from "../metricsReducer/metricsActions";
import {monthInNumberFromString} from "../../constants/chartConstants";

const setDialogsChartData = (dialogsChartData) => ({type: SET_DIALOGS_CHART_DATA, dialogsChartData});
const setDaysChartData = (daysChartData) => ({type: SET_DAYS_CHART_DATA, daysChartData});
const setWeeksChartData = (weeksChartData) => ({type: SET_WEEKS_CHART_DATA, weeksChartData});
const setMonthsChartData = (monthsChartData) => ({type: SET_MONTHS_CHART_DATA, monthsChartData});
const setYearsChartData = (yearsChartData) => ({type: SET_YEARS_CHART_DATA, yearsChartData});

const setSentimentData = (sentimentData) => ({type: SET_SENTIMENT_DATA, sentimentData});
const setARTData = (ARTData) => ({type: SET_ART_DATA, ARTData});
const setFRTData = (FRTData) => ({type: SET_FRT_DATA, FRTData});
const setLabelsData = (labelsData) => ({type: SET_LABELS_DATA, labelsData});
const setSelectedDates = (selectedDates) => ({type: SET_SELECTED_DATES, selectedDates});
const setSelectedOneDate = (selectedOneDate) => ({type: SET_SELECTED_ONE_DATE, selectedOneDate});
const setIndexOfLastDisplayedItem = (indexOfLastDisplayedItem) => ({
    type: SET_INDEX_OF_LAST_DISPLAYED_ITEM,
    indexOfLastDisplayedItem
});
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});


// сетеры, доступные в компонентах
export const setNewIndexOfLastDisplayedItem = (newIndexOfLastDisplayedItem) => (dispatch) => {
    dispatch(setIndexOfLastDisplayedItem(newIndexOfLastDisplayedItem));
}

export const setNewSelectedDates = (newSelectedDates) => (dispatch) => {
    dispatch(setSelectedDates(newSelectedDates));
}

export const handleSetSelectedOneDate = (selectedOneDate) => (dispatch) => {
    dispatch(setSelectedOneDate(selectedOneDate))
}

// запрос на получение данных с диалогов и группировка всех метрик по дням/неделям/месяцам/годам
export const requestDialogsInfo = () => async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await chatsAPI.getDialogsInfo();
    if (response.status === 200) {
        const data = response.json();
        data.then(res => {
                console.log(res);
                const daysData = groupedDataByDays(res);
                const weeksData = groupedDataByWeeks(daysData);
                const monthsData = groupedDataByMonths(daysData);
                const yearsData = groupedDataByYears(monthsData);

                dispatch(setDialogsChartData(res));
                dispatch(setDaysChartData(daysData));
                dispatch(setWeeksChartData(weeksData));
                dispatch(setMonthsChartData(monthsData));
                dispatch(setYearsChartData(yearsData));
                dispatch(arrangeDataForCharts());
            }
        )
    } else {
        console.log('Ошибка в получении данных с чатов');
    }
    dispatch(setIsFetching(false));
}


// метод упорядочивания данных для графиков (тут именно формируются массивы для графиков, датасеты)
export const arrangeDataForCharts = () => (dispatch, getState) => {
    dispatch(setIsFetching(true));
    const selectedPeriod = localStorage.getItem('activeDate');
    const selectedDate = getState().chart.selectedDates;
    // console.log(selectedDate);
    dispatch(getDatasetFromDialogsData(getState().chart.selectedOneDate));
    switch (selectedPeriod) {
        case 'days':
            dispatch(getDatasetFromDaysData(selectedDate));
            break;
        case 'weeks':
            dispatch(getDatasetFromWeeksData(selectedDate));
            break;
        case 'months':
            dispatch(getDatasetFromMonthsData(selectedDate));
            break;
        case 'years':
            dispatch(getDatasetFromYearsData(selectedDate));
            break;
    }
    dispatch(setIsFetching(false));
}


const dispatchChartsDatasets = (labels, sentimentData, ARTData, FRTData) => (dispatch) => {
    dispatch(setLabelsData(labels));
    dispatch(setSentimentData(sentimentData));
    dispatch(setARTData(ARTData));
    dispatch(setFRTData(FRTData));
}

// получение датасетов для графиков с периодом "Диалоги"
const getDatasetFromDialogsData = (selectedDate) => (dispatch, getState) => {
    const dialogsChartData = getState().chart.dialogsChartData;
    let findDate = false;
    let labels = [], sentimentData = [], ARTData = [], FRTData = [];
    if (selectedDate.length === 0) {
        for (let i = 0; i < dialogsChartData.length; i++) {
            labels.push(dialogsChartData[i].date);
            sentimentData.push(dialogsChartData[i].sentiment);
            ARTData.push(dialogsChartData[i].ART);
            FRTData.push(dialogsChartData[i].FRT);
        }
    } else if (selectedDate.length === 1) {
        let i = 0;
        while (i < dialogsChartData.length) {
            if (dialogsChartData[i].date === selectedDate[0]) {
                findDate = true;
                labels.push(dialogsChartData[i].date);
                sentimentData.push(dialogsChartData[i].sentiment);
                ARTData.push(dialogsChartData[i].ART);
                FRTData.push(dialogsChartData[i].FRT);
            } else if (findDate && dialogsChartData[i].date !== selectedDate[0]) {
                i = dialogsChartData.length;
            }
            i++;
        }
    }
    dispatch(dispatchChartsDatasets(labels, sentimentData, ARTData, FRTData));
    dispatch(setNewCurrentAverageSentiment(sentimentData));
    dispatch(setNewCurrentAverageTime(ARTData));
    dispatch(setIndexOfLastDisplayedItem(sentimentData.length - 1));
}

// получение датасетов для графиков с периодом "Дни"
const getDatasetFromDaysData = (selectedDate) => (dispatch, getState) => {
    let findElem = false;
    const daysChartData = getState().chart.daysChartData;
    // console.log(daysChartData);
    const days = Object.keys(daysChartData);
    const daysData = Object.values(daysChartData);
    let labels = [], sentimentData = [], ARTData = [], FRTData = [];
    if (selectedDate.length === 0) {
        for (let i = 0; i < days.length; i++) {
            labels.push(days[i]);
            sentimentData.push(daysData[i].avgSentiment);
            ARTData.push(daysData[i].avgART);
            FRTData.push(daysData[i].avgFRT);
        }
    } else if (selectedDate.length === 2) {
        const arrStartDate = selectedDate[0].split('/').map(Number);
        const arrFinishDate = selectedDate[1].split('/').map(Number);
        const startDate = new Date(arrStartDate[2], arrStartDate[1] - 1, arrStartDate[0]);
        const finishDate = new Date(arrFinishDate[2], arrFinishDate[1] - 1, arrFinishDate[0]);
        let i = 0;
        while (i < days.length) {
            const arrCurrentDate = days[i].split('/').map(Number);
            const currentDate = new Date(arrCurrentDate[2], arrCurrentDate[1] - 1, arrCurrentDate[0]);
            if (startDate <= currentDate && currentDate <= finishDate) {
                labels.push(days[i]);
                sentimentData.push(daysData[i].avgSentiment);
                ARTData.push(daysData[i].avgART);
                FRTData.push(daysData[i].avgFRT);
                findElem = true;
            }
            else if (findElem) {
                i = days.length;
            }
            i++;
        }
    }
    dispatch(dispatchChartsDatasets(labels, sentimentData, ARTData, FRTData));
}

// получение датасетов для графиков с периодом "Недели"
const getDatasetFromWeeksData = (selectedDate) => (dispatch, getState) => {
    let findElem = false;
    const weeksChartData = getState().chart.weeksChartData;
    // console.log(weeksChartData);
    const weeks = Object.keys(weeksChartData);
    const weeksData = Object.values(weeksChartData);
    let labels = [], sentimentData = [], ARTData = [], FRTData = [];
    if (selectedDate.length === 0) {
        for (let i = 0; i < weeks.length; i++) {
            labels.push(weeks[i]);
            sentimentData.push(weeksData[i].avgSentiment);
            ARTData.push(weeksData[i].avgART);
            FRTData.push(weeksData[i].avgFRT);
        }
    } else if (selectedDate.length === 2) {
        const arrStartDate = selectedDate[0].split('/').map(Number);
        const arrFinishDate = selectedDate[1].split('/').map(Number);

        const startDate = new Date(arrStartDate[2], arrStartDate[1] - 1, arrStartDate[0]);
        const finishDate = new Date(arrFinishDate[2], arrFinishDate[1] - 1, arrFinishDate[0]);
        let i = 0;
        while (i < weeks.length) {
            const arrCurrentWeek = weeks[i].split('-');
            const arrBeginningWeek = arrCurrentWeek[0].split('/').map(Number);
            const beginningWeek = new Date(arrBeginningWeek[2], arrBeginningWeek[1] - 1, arrBeginningWeek[0]);

            const arrEndWeek = arrCurrentWeek[1].split('/').map(Number);
            const endWeek = new Date(arrEndWeek[2], arrEndWeek[1] - 1, arrEndWeek[0]);

            if ((beginningWeek <= startDate && startDate <= endWeek) || // начало периода находится в текущей неделе
                (beginningWeek <= finishDate && finishDate <= endWeek) || // конец периода находится в текущей неделе
                (startDate <= beginningWeek && finishDate >= endWeek)) { // текущая неделя находится "внутри" периода

                labels.push(weeks[i]);
                sentimentData.push(weeksData[i].avgSentiment);
                ARTData.push(weeksData[i].avgART);
                FRTData.push(weeksData[i].avgFRT);
                findElem = true;
            }
            else if (findElem) {
                i = weeks.length;
            }
            i++;
        }
    }
    dispatch(dispatchChartsDatasets(labels, sentimentData, ARTData, FRTData));
}

// получение датасетов для графиков с периодом "Месяцы"
const getDatasetFromMonthsData = (selectedDate) => (dispatch, getState) => {
    let findElem = false;
    const monthsChartData = getState().chart.monthsChartData;
    // console.log(monthsChartData);
    const months = Object.keys(monthsChartData);
    const monthsData = Object.values(monthsChartData);
    let labels = [], sentimentData = [], ARTData = [], FRTData = [];
    if (selectedDate.length === 0) {
        for (let i = 0; i < months.length; i++) {
            labels.push(months[i]);
            sentimentData.push(monthsData[i].avgSentiment);
            ARTData.push(monthsData[i].avgART);
            FRTData.push(monthsData[i].avgFRT);
        }
    } else if (selectedDate.length === 2) {
        const [, monthStart, yearStart] = selectedDate[0].split('/').map(Number); // dd mm yyyy
        const [, monthEnd, yearEnd] = selectedDate[1].split('/').map(Number);

        const ratioPeriodStart = monthStart * yearStart; //коэффициент сравнения = месяц * год
        const ratioPeriodEnd = (12 * (yearEnd - yearStart) + monthEnd) * yearStart;

        let i = 0;
        while(i < months.length) {
            const arrCurrMonths = months[i].split(' ');
            const currMonth = monthInNumberFromString[arrCurrMonths[0]] + 1;
            const currYear = Number(arrCurrMonths[1]);
            const ratioCurrDate = (12 * (currYear - yearStart) + currMonth) * yearStart;
            if (ratioPeriodStart <= ratioCurrDate && ratioCurrDate <= ratioPeriodEnd) {
                labels.push(months[i]);
                sentimentData.push(monthsData[i].avgSentiment);
                ARTData.push(monthsData[i].avgART);
                FRTData.push(monthsData[i].avgFRT);
                findElem = true;
            }
            else if (findElem) {
                i = months.length;
            }
            i++;
        }

    }
    dispatch(dispatchChartsDatasets(labels, sentimentData, ARTData, FRTData));
}

// получение датасетов для графиков с периодом "Годы"
const getDatasetFromYearsData = (selectedDate) => (dispatch, getState) => {
    let findElem = false;
    const yearsChartData = getState().chart.yearsChartData;
    // console.log(yearsChartData);
    const years = Object.keys(yearsChartData);
    const yearsData = Object.values(yearsChartData);
    let labels = [], sentimentData = [], ARTData = [], FRTData = [];
    if (selectedDate.length === 0) {
        for (let i = 0; i < years.length; i++) {
            labels.push(years[i]);
            sentimentData.push(yearsData[i].avgSentiment);
            ARTData.push(yearsData[i].avgART);
            FRTData.push(yearsData[i].avgFRT);
        }
    } else if (selectedDate.length === 2) {
        const yearStart = selectedDate[0].split('/').map(Number)[2];
        const yearEnd = selectedDate[1].split('/').map(Number)[2];
        let i = 0;
        while (i < years.length) {
            const currYear = Number(years[i]);
            if (yearStart <= currYear && currYear <= yearEnd) {
                labels.push(years[i]);
                sentimentData.push(yearsData[i].avgSentiment);
                ARTData.push(yearsData[i].avgART);
                findElem = true;
                FRTData.push(yearsData[i].avgFRT);
            } else if (findElem) {
                i = years.length;
            }
            i++;
        }
    }
    dispatch(dispatchChartsDatasets(labels, sentimentData, ARTData, FRTData));
}



