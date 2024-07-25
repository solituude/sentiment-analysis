import {endOfWeek, format, startOfWeek} from "date-fns";


// группировка данных по дням
export const groupedDataByDays = (data) => {
    let groupedDataObj = {};
    // заполняем поле данных объекта дня
    for (let i = 0; i < data.length; i++) {
        const currDate = data[i].date;
        if (!groupedDataObj[currDate]) {
            groupedDataObj[currDate] = {
                data: [],
                avgSentiment: 0,
                avgART: 0,
                avgFRT: 0
            };
        }
        groupedDataObj[currDate].data.push(data[i]);

        // считаем суммы метрик для дальнейшего расчета средних значений за день
        groupedDataObj[currDate].avgSentiment += data[i].sentiment;
        groupedDataObj[currDate].avgART += data[i].ART;
        groupedDataObj[currDate].avgFRT += data[i].FRT;
    }
    // считаем средние значения метрик для каждого дня
    const keyDataObj = Object.keys(groupedDataObj);
    for (let i = 0; i < keyDataObj.length; i++) {
        groupedDataObj[keyDataObj[i]].avgSentiment = Math.round(groupedDataObj[keyDataObj[i]].avgSentiment /
            groupedDataObj[keyDataObj[i]].data.length * 100) / 100;
        groupedDataObj[keyDataObj[i]].avgART = Math.round(groupedDataObj[keyDataObj[i]].avgART /
            groupedDataObj[keyDataObj[i]].data.length * 100) / 100;
        groupedDataObj[keyDataObj[i]].avgFRT = Math.round(groupedDataObj[keyDataObj[i]].avgFRT /
            groupedDataObj[keyDataObj[i]].data.length * 100) / 100;
    }
    return groupedDataObj;
}


//группировка данных по неделям
export const groupedDataByWeeks = (daysData) => {
    let weeksData = {};
    const keyDaysData = Object.keys(daysData);
    for (let i = 0; i < keyDaysData.length; i++) {
        const [currentDay, currentMonth, currentYear] = keyDaysData[i].split('/').map(Number);
        const currentDate = new Date(currentYear, currentMonth - 1, currentDay);

        const startOfWeekDate = startOfWeek(currentDate, {weekStartsOn: 1});
        const endOfWeekDate = endOfWeek(currentDate, {weekStartsOn: 1});

        const startOfWeekFormatted = format(startOfWeekDate, 'dd/MM/yyyy');
        const endOfWeekFormatted = format(endOfWeekDate, 'dd/MM/yyyy');
        const weekKey = `${startOfWeekFormatted}-${endOfWeekFormatted}`;
        if (!weeksData[weekKey]) {
            weeksData[weekKey] = {
                data: [],
                avgSentiment: 0,
                avgART: 0,
                avgFRT: 0,
                countDays: 0,
            };
        }
        weeksData[weekKey].data = weeksData[weekKey].data.concat(daysData[keyDaysData[i]].data);
        weeksData[weekKey].avgSentiment += daysData[keyDaysData[i]].avgSentiment;
        weeksData[weekKey].avgART += daysData[keyDaysData[i]].avgART;
        weeksData[weekKey].avgFRT += daysData[keyDaysData[i]].avgFRT;
        weeksData[weekKey].countDays += 1;
    }
    const keysWeeksArray = Object.keys(weeksData);
    for (let i = 0; i < keysWeeksArray.length; i++) {
        weeksData[keysWeeksArray[i]].avgSentiment = Math.round(weeksData[keysWeeksArray[i]].avgSentiment /
            weeksData[keysWeeksArray[i]].countDays * 100) / 100;
        weeksData[keysWeeksArray[i]].avgART = Math.round(weeksData[keysWeeksArray[i]].avgART /
            weeksData[keysWeeksArray[i]].countDays * 100) / 100;
        weeksData[keysWeeksArray[i]].avgFRT = Math.round(weeksData[keysWeeksArray[i]].avgFRT /
            weeksData[keysWeeksArray[i]].countDays * 100) / 100;
    }
    return weeksData;
}


export const groupedDataByMonths = (daysData) => { // здесь месяцы с 1 до 12
    const monthsArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь",
        "Ноябрь", "Декабрь"];
    const keysDaysData = Object.keys(daysData);
    let monthsData = {};
    for (let i = 0; i < keysDaysData.length; i++) {
        let [, currMonth, currYear] = keysDaysData[i].split('/').map(Number);
        const monthKey = `${monthsArray[currMonth - 1]} ${currYear}`;
        if (!monthsData[monthKey]) {
            monthsData[monthKey] = {
                data: [],
                avgSentiment: 0,
                avgART: 0,
                avgFRT: 0,
                countDays: 0,
            }
        }
        monthsData[monthKey].data = monthsData[monthKey].data.concat(daysData[keysDaysData[i]].data);
        monthsData[monthKey].avgSentiment += daysData[keysDaysData[i]].avgSentiment;
        monthsData[monthKey].avgART += daysData[keysDaysData[i]].avgART;
        monthsData[monthKey].avgFRT += daysData[keysDaysData[i]].avgFRT;
        monthsData[monthKey].countDays += 1;
    }
    const keyMonthsArray = Object.keys(monthsData);
    for (let i = 0; i < keyMonthsArray.length; i++) {
        monthsData[keyMonthsArray[i]].avgSentiment = Math.round(monthsData[keyMonthsArray[i]].avgSentiment /
            monthsData[keyMonthsArray[i]].countDays * 100) / 100;
        monthsData[keyMonthsArray[i]].avgART = Math.round(monthsData[keyMonthsArray[i]].avgART /
            monthsData[keyMonthsArray[i]].countDays * 100) / 100;
        monthsData[keyMonthsArray[i]].avgFRT = Math.round(monthsData[keyMonthsArray[i]].avgFRT /
            monthsData[keyMonthsArray[i]].countDays * 100) / 100;
    }
    return monthsData;
}

export const groupedDataByYears = (monthsData) => {
    const arrayKeysMonthsData = Object.keys(monthsData);
    let yearsData = {};
    for (let i = 0; i < arrayKeysMonthsData.length; i++) {
        const year = arrayKeysMonthsData[i].split(' ')[1];
        if (!yearsData[year]) {
            yearsData[year] = {
                data: [],
                avgSentiment: 0,
                avgART: 0,
                avgFRT: 0,
                countMonths: 0,
            };
        }
        yearsData[year].data = yearsData[year].data.concat(monthsData[arrayKeysMonthsData[i]].data);
        yearsData[year].countMonths += 1;
        yearsData[year].avgSentiment += monthsData[arrayKeysMonthsData[i]].avgSentiment;
        yearsData[year].avgART += monthsData[arrayKeysMonthsData[i]].avgART;
        yearsData[year].avgFRT += monthsData[arrayKeysMonthsData[i]].avgFRT;
    }
    const keyYearsArray = Object.keys(yearsData);
    for (let i = 0; i < keyYearsArray.length; i++) {
        yearsData[keyYearsArray[i]].avgSentiment = Math.round(yearsData[keyYearsArray[i]].avgSentiment /
            yearsData[keyYearsArray[i]].countMonths * 100) / 100;
        yearsData[keyYearsArray[i]].avgART = Math.round(yearsData[keyYearsArray[i]].avgART /
            yearsData[keyYearsArray[i]].countMonths * 100) / 100;
        yearsData[keyYearsArray[i]].avgFRT = Math.round(yearsData[keyYearsArray[i]].avgFRT /
            yearsData[keyYearsArray[i]].countMonths * 100) / 100;
    }
    return yearsData;
}

// для получения группировки
//                              по неделям - передавать дни
//                              по месяцам - дни
//                              по годам - месяцы
const monthsArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь",
    "Ноябрь", "Декабрь"];
export const groupingDataByLongPeriod = (period, dialogsData) => {
    let groupedObject = {};
    const arrayKeysData = Object.keys(dialogsData);
    for (let i = 0; i < arrayKeysData.length; i++) {
        let key = "";
        switch (period){
            case "weeks":
                const [currentDay, currentMonth, currentYear] = arrayKeysData[i].split('/').map(Number);
                const currentDate = new Date(currentYear, currentMonth - 1, currentDay);

                const startOfWeekDate = startOfWeek(currentDate, {weekStartsOn: 1});
                const endOfWeekDate = endOfWeek(currentDate, {weekStartsOn: 1});

                const startOfWeekFormatted = format(startOfWeekDate, 'dd/MM/yyyy');
                const endOfWeekFormatted = format(endOfWeekDate, 'dd/MM/yyyy');
                key = `${startOfWeekFormatted}-${endOfWeekFormatted}`;
                break;

            case "months":
                let [, currMonth, currYear] = arrayKeysData[i].split('/').map(Number);
                key = `${monthsArray[currMonth - 1]} ${currYear}`;
                break;

            case "years":
                key = arrayKeysData[i].split(' ')[1];
                break;
        }
        if (!groupedObject[key]) {
            groupedObject[key] = {
                data: [],
                avgSentiment: 0,
                avgART: 0,
                avgFRT: 0
            };
        }
        groupedObject[key].data = groupedObject[key].data.concat(dialogsData[arrayKeysData[i]].data);
        groupedObject[key].avgSentiment += dialogsData[arrayKeysData[i]].avgSentiment;
        groupedObject[key].avgSentiment = Math.round(groupedObject[key].avgSentiment + dialogsData[arrayKeysData[i]].avgSentiment * 10) / 10;
        groupedObject[key].avgART += dialogsData[arrayKeysData[i]].avgART;
        groupedObject[key].avgFRT += dialogsData[arrayKeysData[i]].avgFRT;
    }
    const keysArray = Object.keys(groupedObject);
    for (let i = 0; i < keysArray.length; i++) {
        groupedObject[keysArray[i]].avgSentiment = Math.round(groupedObject[keysArray[i]].avgSentiment /
            groupedObject[keysArray[i]].data.length * 100) / 100;
        groupedObject[keysArray[i]].avgART = Math.round(groupedObject[keysArray[i]].avgART /
            groupedObject[keysArray[i]].data.length * 100) / 100;
        groupedObject[keysArray[i]].avgFRT = Math.round(groupedObject[keysArray[i]].avgFRT /
            groupedObject[keysArray[i]].data.length * 100) / 100;
    }
    return groupedObject;
}

export function formatMinutes(count) {
    if (count === 1 || (count % 10 === 1 && count % 100 !== 11)) {
        return "минута";
    } else if (
        (count >= 2 && count <= 4) ||
        ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 12 || count % 100 > 14))
    ) {
        return "минуты";
    } else {
        return "минут";
    }
}
