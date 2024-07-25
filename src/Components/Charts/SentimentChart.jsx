import React, { useEffect, useState } from 'react';
import './SentimentChart.css'

import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';

import { getLastNValues, getLastNValues2, getLastNDates, getLastNumbersOfChats, calculateAverageSentimentByDate, groupDataByWeek, groupDataByMonths, groupDataByYear } from './Functions/functions.js'
import ChartSentiment from './Chart/Chart';

const SentimentChart = ({ data }) => {

    const [dataChart, setDataChart] = useState([]) // Состояние с полученными данными
    const [test, setTest] = useState([]) // Состояние с преобразованными данными, далее используем уже их

    const [date, setDate] = useState([])
    const [selected, setSelected] = useState(1);

    const [values, setValues] = useState()
    const [labels, setLabs] = useState()
    const [numbersChats, setNumbersChats] = useState()

    useEffect(() => {
        setTest(data)
    }, [data]);

    function handleNonEmptyState() {
        setValues(getLastNValues2(test))
        setLabs(getLastNDates(test))
        setNumbersChats(getLastNumbersOfChats(test))
    }

    useEffect(() => {
        if (test.length > 0) {
            handleNonEmptyState();
        }
    }, [test]);


    // console.log("Диалоги", test);

    const groupedDayData = calculateAverageSentimentByDate(test);
    // console.log("Дни", groupedDayData)

    const groupedWeekData = groupDataByWeek(groupedDayData);
    // console.log("Недели", groupedWeekData)


    let groupedMonthsData = groupDataByMonths(groupedWeekData);
    // console.log("Месяца", groupedMonthsData)


    let groupedYearData = groupDataByYear(groupedMonthsData);
    // console.log("Года", groupedYearData)

    //кнопки для навигации по датам
    const buttons = [
        { id: "dialogs", label: "Диалоги" },
        { id: "days", label: "Дни" },
        { id: "weeks", label: "Недели" },
        { id: "months", label: "Месяцы" },
        { id: "years", label: "Годы" },
    ];

    // Выбор периода дат(кнопки)
    const setData = (value) => {
        setSelected(value);
        if (value === "dialogs") { //Диалоги
            setValues(getLastNValues2(test))
            setLabs(getLastNDates(test))
            setNumbersChats(getLastNumbersOfChats(test))

        }
        if (value === "days") { //Дни
            setValues(getLastNValues2(groupedDayData))
            setLabs(getLastNDates(groupedDayData))
            setNumbersChats(getLastNumbersOfChats(groupedDayData))
        }
        if (value === "weeks") { //Недели
            setValues(getLastNValues2(groupedWeekData))
            setLabs(getLastNDates(groupedWeekData))
            setNumbersChats(getLastNumbersOfChats(groupedWeekData))
        }
        if (value === "months") { //Месяцы
            setValues(getLastNValues2(groupedMonthsData))
            setLabs(getLastNDates(groupedMonthsData))
            setNumbersChats(getLastNumbersOfChats(groupedMonthsData))
        }
        if (value === "years") { //Годы
            setValues(getLastNValues2(groupedYearData))
            setLabs(getLastNDates(groupedYearData))
            setNumbersChats(getLastNumbersOfChats(groupedYearData))
        }
    }

    const findStartAndEndOfWeek = (data) => {
        var date = new Date(data);
        var startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)));
        var endOfWeek = new Date(date.setDate(date.getDate() + 6));

        function formatDate(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            if (day < 10) {
                day = '0' + day;
            }

            if (month < 10) {
                month = '0' + month;
            }

            return day + '/' + month + '/' + year;
        }

        let massive = [];

        massive.push(formatDate(startOfWeek));
        massive.push(formatDate(endOfWeek));

        return massive;
    }

    // Месячный период по датам
    function getMonthRange(date) {
        var startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        var endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        function formatDate(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            if (day < 10) {
                day = '0' + day;
            }

            if (month < 10) {
                month = '0' + month;
            }

            return day + '/' + month + '/' + year;
        }

        let range = [];

        range.push(formatDate(startOfMonth));
        range.push(formatDate(endOfMonth));

        return range;
    }

    // Недельный период по датам
    const getWeekRange = (startDate1, endDate1) => {
        const dateParts = startDate1.split('/');
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Формируем новую строку в формате ГГГГ/ММ/ДД

        const dateParts1 = endDate1.split('/');
        const formattedDate1 = `${dateParts1[2]}/${dateParts1[1]}/${dateParts1[0]}`; // Формируем новую строку в формате ГГГГ/ММ/ДД

        const dateRange = [];

        const currentDate = new Date(formattedDate);
        const lastDate = new Date(formattedDate1);

        while (currentDate <= lastDate) {
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
            dateRange.push(formattedDate);

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateRange;
    }

    // Ищем даты в массиве
    function findSentimentAndNumbersOfChats(dates) {
        let sentimentArray = [];
        let numbersOfChatsArray = [];
        let labels = [];
        let selectedObjects = [];
        let abc1 = [];

        if (selected === 1) {
            test.filter((item) => {
                return dates.includes(item.date);
            }).map((item) => {
                sentimentArray.push(item.sentiment);
                numbersOfChatsArray.push(item.count);
                labels.push(item.date);
            });

            console.log(dates);
        };

        if (selected === 2) {
            groupedDayData.filter((item) => {
                return dates.includes(item.date);
            }).map((item) => {
                sentimentArray.push(item.sentiment);
                numbersOfChatsArray.push(item.count);
                labels.push(item.date);
            });
            console.log(dates);
        };

        if (selected === 3) {
            let firstDay = findStartAndEndOfWeek(date[0]); // Первый день выбранного периода
            let lastDay = findStartAndEndOfWeek(date[1]); // Последний день выбранного периода

            const selectedPeriodDates = getWeekRange(firstDay[0], lastDay[1]); // Определяем период этих дат

            groupedDayData.filter((item) => {
                return selectedPeriodDates.includes(item.date);
            }).map((item) => {
                selectedObjects.push(item);
            }); // Выбираем все объекты по нужному периоду дат

            let grouppedSelectedDates = groupDataByWeek(selectedObjects); // Объединяем все объекты (дни) в недели

            // Присваиваем все значения 
            sentimentArray = getLastNValues2(grouppedSelectedDates);
            numbersOfChatsArray = getLastNumbersOfChats(grouppedSelectedDates);
            labels = getLastNDates(grouppedSelectedDates);
        }

        if (selected === 4) {
            let firstDay = getMonthRange(date[0]);
            let lastDay = getMonthRange(date[1]);

            const selectedPeriodDates = getWeekRange(firstDay[0], lastDay[1]);

            groupedDayData.filter((item) => {
                return selectedPeriodDates.includes(item.date);
            }).map((item) => {
                selectedObjects.push(item);
            });

            let grouppedByWeek = groupDataByWeek(selectedObjects);
            let grouppedSelectedDates = groupDataByMonths(grouppedByWeek);

            sentimentArray = getLastNValues2(grouppedSelectedDates);
            numbersOfChatsArray = getLastNumbersOfChats(grouppedSelectedDates);
            labels = getLastNDates(grouppedSelectedDates);

        }

        setValues(sentimentArray);
        setNumbersChats(numbersOfChatsArray);
        setLabs(labels);
    }

    // Берем нужный период дат 
    function filterDataByDateRange(startDate, endDate) {
        const today = new Date();
        const date = new Date(startDate.toString());
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;

        const date1 = new Date(endDate.toString());
        const day1 = date1.getDate().toString().padStart(2, '0');
        const month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
        const year1 = date1.getFullYear().toString();
        const formattedDate1 = `${day1}/${month1}/${year1}`;

        if (date > today || date1 > today) {
            setDate([])
            console.log("Oшибка");
            return;
        }

        const filteredData = groupedDayData.filter((item) => {
            const date = new Date(item.date.split('/').reverse().join('-'));
            return date >= new Date(formattedDate.split('/').reverse().join('-')) && date <= new Date(formattedDate1.split('/').reverse().join('-'));
        });

        const selectedDates = filteredData.map((item) => item.date);

        findSentimentAndNumbersOfChats(selectedDates);
    }

    // Отслеживаем выбор дат в календаре
    useEffect(() => {
        if (calendarDate.length > 2) {
            let startDate = calendarDate[1];
            let endDate = calendarDate[2];
            filterDataByDateRange(startDate, endDate);
            // setCalendarDate([startDate, endDate]);
        } else if (calendarDate.length === 2) {
            let startDate = calendarDate[0];
            let endDate = calendarDate[1];
            filterDataByDateRange(startDate, endDate);

            const date = new Date(startDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

            const date1 = new Date(endDate);
            const day1 = date1.getDate();
            const month1 = date1.getMonth() + 1;
            const year1 = date1.getFullYear();
            const formattedDate1 = `${day1 < 10 ? '0' + day1 : day1}.${month1 < 10 ? '0' + month1 : month1}.${year1}`;

            let stringDate = formattedDate + " - " + formattedDate1;

            setDdate(stringDate)

        }
        if (calendarDate.length === 0) {
            setChartValues(getLastNValues2(dialogaDate))
            setChartLabels(getLastNDates(dialogaDate))
            setNumbersOfChats(getLastNumbersOfChats(dialogaDate))

            setDdate("")
        }
    }, [calendarDate, activeDate]);

    const [ddate, setDdate] = useState("")

    return (
        <>
            <p className="text">Тональность общения</p>
            <div id="popup-window" style={{ display: 'none', }}>
                <p id="popup-content"></p>
            </div>
            <div className="menuButtons">
                <div className='calen'>
                    <Calendar
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        selectionMode="multiple"
                        dateFormat="dd/mm/yy"
                        showIcon
                        inputStyle={{  backgroundColor: 'transparent', border: '0px', position: "absolute", left: "30px", top: "0", width: "1px" }}
                        className="custom-calendar-icon"
                    />
                </div>
                <div className="clickButtons">
                    {buttons.map((button) => (
                        <button key={button.id} className={selected === button.id ? "button-pressed" : "button1"} onClick={() => setData(button.id)}> {button.label} </button>
                    ))}
                </div>
            </div>
            {numbersChats && values && labels && selected ? (
                <ChartSentiment numbersChats={numbersChats} values={values} labels={labels} selected={selected} />
            ) : (
                <div className='error_chart_loading'>
                    <div className="spinner"></div>
                </div>

            )}

        </>
    )


};

export default SentimentChart;