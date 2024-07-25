import React, {useEffect, useState, useMemo} from "react";
import {Col, Row} from "react-bootstrap";
import ManagerHeader from "./ManagerHeader/ManagerHeader";
import NTB from "../../../Components/Metrics/NTB/NTB";
import s from './managerhomepage.module.scss';
import FRT from "../../../Components/Metrics/FRT/FRT";
import DialogStatistic from "../../../Components/Metrics/DialogStatistic/DialogStatistic";
import ART from "../../../Components/Metrics/ART/ART";
import dropdownIcon from '../../../assets/img/homepages/dropdown.svg';
import hideListIcon from '../../../assets/img/homepages/hideList.svg';
import hideListDarkIcon from '../../../assets/img/homepages/hideListDarkIcon.svg';
import closeIcon from '../../../assets/img/homepages/closeIcon.svg';
import MeanTone from "../../Operator/PersonalInfo/Statistics/MeanTone";
import MeanTime from "../../Operator/PersonalInfo/Statistics/MeanTime";
import ChartManager from "../../../Components/Charts/ChartManager";
import TimeFilter from "../../../Components/Metrics/TimeFilter/TimeFilter";
import NPS from "../../../Components/Metrics/NPS/NPS";
import {getValuesART, getValuesFRT} from "../../../Components/Metrics/functions/functionsMetrics";
import {
    getLastNDates,
    getLastNumbersOfChats,
    getLastNValues2,
    calculateAverageSentimentByDate,
    groupDataByWeek,
    groupDataByMonths,
    groupDataByYear,
} from "../../../Components/Charts/Functions/functions";

import CalendarDate from "./CalendarDate/CalendarDate";
import calendarIcon from "../../../assets/img/metrics/calendarIcon.svg";

import DualCalendar from "../../../Components/Calendar/DualCalendar";
import SLA from "../../../Components/Metrics/SLA/SLA";
import SingleCalendar from "../../../Components/Calendar/SingleCalendar";
import {
    formatDate,
    generatePastDates,
    filterDateRanges,
    filterObjectsByDateRange,
    findIndexesByDates,
} from '../../../helpers/managerHomepageHelpers';
import MetricsList from "../../../Components/MetricsList/MetricsList";
import DisplayButton from "../../../UI/DisplayButton/DisplayButton";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();
// cookies.set("test", 'kfkfk', {
//     path: "/",
// });

const ManagerHomepage = () => {
    const chartSettings = localStorage.getItem('chartSettings');
    const chartSettingsParse = JSON.parse(chartSettings);

    const [countShow, setCountShow] = useState(9);
    const [isCounterActive, setIsCounterActive] = useState(false);
    const [dialogaDate, setDialogsDate] = useState([]);

    const [calendarDate, setCalendarDate] = useState([])
    const [activeDate, setActiveDate] = useState(localStorage.getItem("activeDate") !== "null" ?
        localStorage.getItem("activeDate") : "dialogs")

    const [chartValues, setChartValues] = useState([])
    const [chartLabels, setChartLabels] = useState([]);
    const [numbersOfChats, setNumbersOfChats] = useState([]);

    const [countOfDialogs, setCountOfDialogs] = useState(0)
    const [avgProcessingTime, setAvgProcessingTime] = useState(0)
    const [countOfUnfinishedDialogs, setCountOfUnfinishedDialogs] = useState(0)

    // max и min значения графика в текущий момент
    const [minX, setMinX] = useState(null)
    const [maxX, setMaxX] = useState(null)

    // актуальная дата (для поля рядом с календарем) currentSelectedDate
    const storedSelectedDate = localStorage.getItem("selectedDate");

    const defaultSelectedDate = ['22/05/2023', '27/05/2023'];

    const [currentSelectedDate, setCurrentSelectedDate] = useState(
        storedSelectedDate && storedSelectedDate !== "null"
            ? storedSelectedDate.split(",")
            : defaultSelectedDate
    );

    const theme = localStorage.getItem('theme');

    const [showInfo, setShowInfo] = useState({
        meanSentiment: chartSettings !== null ? Boolean(chartSettingsParse.showMeanSentiment) : true,
        meanTime: chartSettings !== null ? Boolean(chartSettingsParse.showMeanTime) : true,
        sentiment: chartSettings !== null ? Boolean(chartSettingsParse.showSentiment) : true,
        NTB: chartSettings !== null ? Boolean(chartSettingsParse.showNTB) : true,
        FRT: chartSettings !== null ? Boolean(chartSettingsParse.showFRT) : true,
        quantityStat: chartSettings !== null ? Boolean(chartSettingsParse.showQuantityStat) : true,
        ART: chartSettings !== null ? Boolean(chartSettingsParse.showART) : true,
        NPS: chartSettings !== null ? Boolean(chartSettingsParse.showNPS) : true,
        SLA: chartSettings !== null ? Boolean(chartSettingsParse.showSLA) : true,
    })

    function findLastTrueField(obj) {
        const keys = Object.keys(obj);
        for (let i = keys.length - 1; i >= 0; i--) {
            const key = keys[i];
            if (obj[key]) {
                return key;
            }
        }
        return null;
    }

    const lastTrueField = findLastTrueField(showInfo);

    const [showTooltipSentiment, setShowTooltipSentiment] = useState(false);
    const [showTooltipFRT, setShowTooltipFRT] = useState(false);
    const [showTooltipART, setShowTooltipART] = useState(false);


    const [dataComponents, setDataComponents] = useState({
        ART: [],
        FRT: [],
        NTB: 0,
    });


    const graphicsStates = [
        {
            name: "Тональность общения",
            isShow: showInfo.sentiment,
            setIsShow: (newValue) => setShowInfo({...showInfo, sentiment: newValue}),
        },
        {
            name: "Средняя тональность",
            isShow: showInfo.meanSentiment,
            setIsShow: (newValue) => setShowInfo({...showInfo, meanSentiment: newValue}),
        },
        {
            name: "Среднее время закрытия запроса",
            isShow: showInfo.meanTime,
            setIsShow: (newValue) => setShowInfo({...showInfo, meanTime: newValue}),
        },
        {
            name: "Количество просроченных обращений ",
            isShow: showInfo.NTB,
            setIsShow: (newValue) => setShowInfo({...showInfo, NTB: newValue}),
        },
        {
            name: "Время первого ответа",
            isShow: showInfo.FRT,
            setIsShow: (newValue) => setShowInfo({...showInfo, FRT: newValue}),
        },
        {
            name: "Количественная статистика по диалогам",
            isShow: showInfo.quantityStat,
            setIsShow: (newValue) => setShowInfo({...showInfo, quantityStat: newValue}),
        },
        {
            name: "Время решения запроса",
            isShow: showInfo.ART,
            setIsShow: (newValue) => setShowInfo({...showInfo, ART: newValue}),
        },
        {
            name: "Индекс удовлетворенности клиентов",
            isShow: showInfo.NPS,
            setIsShow: (newValue) => setShowInfo({...showInfo, NPS: newValue}),
        },
        {
            name: "SLA",
            isShow: showInfo.SLA,
            setIsShow: (newValue) => setShowInfo({...showInfo, SLA: newValue}),
        }
    ];

    let getHistory = async () => {
        let response = await fetch('/chats/dialogs/getInfo/');
        let data = await response.json();
        console.log(data);
        setDialogsDate(data);
    }

    let getCountOfDialogs = async () => {
        let response = await fetch('/metrics/dialogs/count/');
        let data = await response.json();
        setCountOfDialogs(data.countOfDialogs)
    }

    let getAvgProcessingTime = async () => {
        let response = await fetch('/metrics/dialogs/avgProcessingTime/');
        let data = await response.json();
        setAvgProcessingTime(data.averageTime)
    }

    let getCountOfUnfinishedDialogs = async () => {
        let response = await fetch('/metrics/dialogs/countOfUnfinishedDialogs/');
        let data = await response.json();
        setCountOfUnfinishedDialogs(data.countOfUnfinishedDialogs)
    }

    useEffect(() => {
        getHistory();
        getCountOfDialogs();
        getAvgProcessingTime();
        getCountOfUnfinishedDialogs();
    }, []);

    const groupedDayData = calculateAverageSentimentByDate(dialogaDate); // Дни

    const groupedWeekData = groupDataByWeek(groupedDayData); // Недели

    const groupedMonthsData = groupDataByMonths(groupedWeekData); // Месяцы

    const groupedYearData = groupDataByYear(groupedMonthsData); // Годы

    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [test, setTest] = useState([])

    const setInitialData = (dateValues) => {
        let indexes = [];
        let rangeDatesDays = [];
        let rangeDatesRest = [];
        let selectedDates = [];
        let date = 0;
        let dates = []

        console.log(currentSelectedDate)
        if (isInitialLoad) {
            rangeDatesDays = filterObjectsByDateRange(returnActiveValues(activeDate), currentSelectedDate[0], currentSelectedDate[1]);
            if (activeDate === "days") {
                dates = generatePastDates(rangeDatesDays[0])
            }

            if (activeDate === "weeks") {
                rangeDatesRest = filterDateRanges(returnActiveValues(activeDate), currentSelectedDate[0], currentSelectedDate[1]);
            }
        } else {
            if (activeDate === "days") {
                date = returnActiveValues(activeDate)[dateValues.maxXValue].date;
                rangeDatesDays = generatePastDates(date);
            }

            if (activeDate === "weeks") {
                date = returnActiveValues(activeDate)[dateValues.maxXValue].date;
                const [startDate, endDate] = date.split('-');
                rangeDatesRest.push(startDate)
                rangeDatesRest.push(endDate)
            }
        }

        if (activeDate === "days") {
            indexes = findIndexesByDates(returnActiveValues(activeDate), rangeDatesDays);
            selectedDates.push(rangeDatesDays[rangeDatesDays.length - 1]);
            selectedDates.push(rangeDatesDays[0]);
        }
        console.log('RANGE DATES REST', rangeDatesRest)
        // console.log('SELECTED DATES', selectedDates)

        if (activeDate === "weeks" || activeDate === "months" || activeDate === "years") {
            indexes = findIndexesByDates(returnActiveValues(activeDate), rangeDatesRest);

            if (rangeDatesRest.length === 1) {
                selectedDates.push(rangeDatesRest[0].split("-")[0])
                selectedDates.push(rangeDatesRest[0].split("-")[1])
                console.log("1")
            } else if (rangeDatesRest.length > 1) {
                if (!isInitialLoad) {
                    selectedDates.push(rangeDatesRest[0])
                    selectedDates.push(rangeDatesRest[1])
                    console.log("2")
                } else {
                    selectedDates.push(rangeDatesRest[0].split("-")[0])
                    selectedDates.push(rangeDatesRest[1].split("-")[1])
                    console.log("3")
                }

            }

        }

        console.log('SELECTED DATES', selectedDates)
        if (selectedDates.length === 0) {
            // selectedDates = ['03/10/2023', '10/10/2023']
            selectedDates = ['22/05/2023', '27/05/2023'];
        }

        localStorage.setItem("selectedDate", selectedDates.toString());

        setCurrentSelectedDate(selectedDates)
        setIsInitialLoad(false);

        return indexes;
    }

    useEffect(() => {
        // Значения для графика тональности
        setChartValues(getLastNValues2(returnActiveValues(activeDate)));
        setChartLabels(getLastNDates(returnActiveValues(activeDate)));
        setNumbersOfChats(getLastNumbersOfChats(returnActiveValues(activeDate)));

        if (activeDate === "dialogs") {
            console.log("render2")
            let data = returnActiveValues(activeDate)
            if (data.length !== 0) {
                filterDataByDateRange(data[data.length - 1].date)
            }
        }

        setDataComponents({
            ...dataComponents,
            FRT: getValuesFRT(returnActiveValues(activeDate)),
            ART: getValuesART(returnActiveValues(activeDate))
        });
    }, [dialogaDate])

    useEffect(() => {
        localStorage.setItem("activeDate", activeDate)

        setIsInitialLoad(true)

        if (activeDate === "dialogs") {
            console.log("render1")
            let data = returnActiveValues(activeDate)
            if (data.length !== 0) {
                filterDataByDateRange(data[data.length - 1].date)
                setMinX(0)
                setMaxX(chartValues.length - 1)
            }
        } else {
            setChartValues(getLastNValues2(returnActiveValues(activeDate)));
            setChartLabels(getLastNDates(returnActiveValues(activeDate)));
            setNumbersOfChats(getLastNumbersOfChats(returnActiveValues(activeDate)));

            setDataComponents({
                ...dataComponents,
                FRT: getValuesFRT(returnActiveValues(activeDate)),
                ART: getValuesART(returnActiveValues(activeDate))
            });
        }

    }, [activeDate])

    // Ищем даты в массиве
    function findSentimentAndNumbersOfChats(date) {
        let sentimentArray = [];
        let labels = [];
        let arrays = [];
        let arrayFRT = [];
        let index = [];

        if (activeDate === "dialogs") {
            dialogaDate.filter((item) => date.includes(item.date)).forEach((item) => {
                index.push(dialogaDate.findIndex((el) => el.date === item.date));

                sentimentArray.push(item.sentiment);
                labels.push(item.date);
                arrays.push(item.ART);
                arrayFRT.push(item.FRT);
            });
        }

        if (sentimentArray.length === 0) {
            console.log("Error date")
        } else {
            setChartValues(sentimentArray);
            setChartLabels(labels);
            setDataComponents({...dataComponents, FRT: arrayFRT, ART: arrays});
        }
    }

    const [singleDate, setSingleDate] = useState('')

    // Берем нужный период дат 
    function filterDataByDateRange(startDate) {
        const today = new Date();
        const date = new Date(startDate.toString());
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;


        if (date > today) {
            setCalendarDate([])
            console.log("Oшибка");
            return;
        }

        const selectedDate = formattedDate;
        let dates = []
        dates.push(selectedDate)
        console.log(formattedDate)
        setTest(dates)
        setSingleDate(selectedDate)
        setShowCalendar(false)
        findSentimentAndNumbersOfChats(selectedDate);
    }

    const returnActiveValues = (activeDate) => {
        if (activeDate === "dialogs") {
            return dialogaDate;
        } else if (activeDate === "days") {
            return groupedDayData;
        } else if (activeDate === "weeks") {
            return groupedWeekData;
        } else if (activeDate === "months") {
            return groupedMonthsData;
        } else if (activeDate === "years") {
            return groupedYearData;
        }
    }

    const chartData = useMemo(() => {
        return {
            chartValues,
            chartLabels,
        };
    }, [chartValues, chartLabels]);

    const [dualDate, setDualDate] = useState([])

    const findIndexDualCalendar = (dates) => {
        setDualDate(dates)

        let startdate = formatDate(dates[0])
        let enddate = formatDate(dates[1])
        let selectedDates = []
        let indexes = [];

        let range = filterObjectsByDateRange(returnActiveValues(activeDate), startdate, enddate);

        if (activeDate === "days") {
            indexes = findIndexesByDates(returnActiveValues(activeDate), range);
            selectedDates.push(enddate);
            selectedDates.push(startdate);
        }
        localStorage.setItem("selectedDate", selectedDates.toString());

        setCurrentSelectedDate(selectedDates)
        setShowCalendar(false)
        setMinX(indexes.endIndex)
        setMaxX(indexes.startIndex)
    }

    // перемещение графика, когда выбран период дат
    const movingChartWithDate = (dataValues) => {
        console.log(dataValues)
    }

    const changeDateCalendar = (dateValues) => {
        if (activeDate === "dialogs") {

        } else {
            if (dualDate.length === 2) {
                movingChartWithDate(dateValues);
            } else {
                if (dialogaDate.length !== 0) {
                    const indexes = setInitialData(dateValues);

                    setMinX(indexes.endIndex)
                    setMaxX(indexes.startIndex)
                }
            }
        }
    }

    useEffect(() => {
        let dates = [];
        let startDate = 0;
        let endDate = 0;

        if (minX != null && maxX != null) {
            if (activeDate === "days") {
                if (dualDate.length === 0) {
                    let date = returnActiveValues(activeDate)[maxX].date;
                    let rangeDatesDays = generatePastDates(date);
                    startDate = rangeDatesDays[0];
                    endDate = rangeDatesDays[rangeDatesDays.length - 1];
                } else {
                    startDate = formatDate(dualDate[0]);
                    endDate = formatDate(dualDate[1]);
                }
            }

            if (activeDate === "dialogs") {
                dates.push(singleDate)
            }

            dates.push(endDate);
            dates.push(startDate);
            setTest(dates);
        }
    }, [minX, maxX]);


    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        let obj = {
            'showMeanSentiment': showInfo.meanSentiment,
            'showMeanTime': showInfo.meanTime,
            'showSentiment': showInfo.sentiment,
            'showNTB': showInfo.NTB,
            'showFRT': showInfo.FRT,
            'showQuantityStat': showInfo.quantityStat,
            'showART': showInfo.ART,
            'showNPS': showInfo.NPS,
            'showSLA': showInfo.SLA
        }
        let arr = Object.values(obj);
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                count++;
            }
        }
        setCountShow(count);
        localStorage.setItem('chartSettings', JSON.stringify(obj));
    }, [showInfo]);

    return (
        <div className={s.personal_info__content}>
            <ManagerHeader/>
            <div className={s.main__container}>
                <Row xs={12}>
                    <div className={s.filters}>
                        <TimeFilter setActiveDate={setActiveDate}/>

                        <div onClick={() => setShowCalendar(!showCalendar)} style={{
                            height: "28px",
                            minWidth: "40px",
                            marginLeft: "20px",
                            cursor: "pointer",
                            backgroundColor: "var(--calendar-button-background)",
                            borderRadius: "8px",
                            padding: "6px 0 0 12px"
                        }}>
                            <div>
                                <img src={calendarIcon} alt={" "}/>
                            </div>
                            {activeDate === "dialogs" ? (showCalendar &&
                                <SingleCalendar filterDataByDateRange={filterDataByDateRange}/>) : (showCalendar &&
                                <DualCalendar findIndexDualCalendar={findIndexDualCalendar}/>)}
                        </div>

                        <CalendarDate data={test} activeDate={activeDate}/>

                        {dualDate.length === 2 ? (
                            <div onClick={() => setDualDate([])} style={{marginLeft: "10px", cursor: "pointer"}}>
                                <img src={closeIcon} style={{height: "22px", width: "22px"}} alt={" "}/>
                            </div>
                        ) : null}


                        <DisplayButton isCounterActive={isCounterActive}
                                       setIsCounterActive={setIsCounterActive}
                                       countShow={countShow} theme={theme}/>
                    </div>
                </Row>

                {isCounterActive ? <MetricsList setIsCounterActive={setIsCounterActive} graphicsStates={graphicsStates}/>
                    : null}

                <div className={s.data__container}>
                    <Row className={s.sentiment__container}>
                        {
                            showInfo.sentiment ?
                                <Col xl={showInfo.meanTime || showInfo.meanSentiment ? 8 : 12} xs={12}
                                     className="order-xl-0 order-1">
                                    <div className={s.chart__sentiment}>
                                        <ChartManager lastTrueField={lastTrueField}
                                                      setShowTooltipSentiment={setShowTooltipSentiment}
                                                      minX={minX}
                                                      maxX={maxX}
                                                      changeDateCalendar={changeDateCalendar}
                                                      chartData={chartData}
                                                      title="Тональность общения"
                                                      activeDate={activeDate}
                                        />
                                    </div>
                                </Col> : null
                        }
                        {
                            showInfo.meanTime || showInfo.meanSentiment ?
                                <Col xl={3} xs={12} className="order-xl-1 order-0">
                                    <div className={s.statistics__container}>
                                        {showInfo.meanSentiment ? <MeanTone/> : null}
                                        {showInfo.meanTime ? <MeanTime values={dataComponents.ART}/> : null}
                                    </div>
                                </Col> : null
                        }
                    </Row>

                    {showInfo.NTB ? <NTB/> : null}

                    {showInfo.FRT ? <FRT minX={minX}
                                         maxX={maxX}
                                         values={dataComponents.FRT}
                                         chartLabels={chartLabels}
                                         setShowTooltipFRT={setShowTooltipFRT}
                                         lastTrueField={lastTrueField}/> : null}

                    {showInfo.quantityStat ? <DialogStatistic countOfDialogs={countOfDialogs}
                                                              avgProcessingTime={avgProcessingTime}
                                                              countOfUnfinishedDialogs={countOfUnfinishedDialogs}/> : null}

                    {showInfo.ART ? <ART minX={minX}
                                         maxX={maxX}
                                         values={dataComponents.ART}
                                         chartLabels={chartLabels}
                                         setShowTooltipART={setShowTooltipART}
                                         lastTrueField={lastTrueField}/> : null}
                    {showInfo.NPS ? <NPS/> : null}
                    {showInfo.SLA ? <SLA/> : null}
                </div>
            </div>
        </div>
    )
}

export default ManagerHomepage;
