import React, {useEffect, useState} from 'react';
import s from './NPS.module.scss';
import leftCSATIcon from '../../../assets/img/metrics/leftCSAT.svg';
import rightCSATIcon from '../../../assets/img/metrics/rightCSAT.svg';

import {
    availabilityValue, findRatingByYearAndMonth, getStatistic, returnStringMonth, updateCurrentData
} from './functions/barChartFunctions';

import {defaultData, receivedData} from "./dataset";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BarChart from "./BarChart/BarChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const NPS = () => {
    const [currentData, setCurrentData] = useState(defaultData);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentYear, setCurrentYear] = useState(0);

    const [availabilityNext, setAvailabilityNext] = useState(false);
    const [availabilityPrev, setAvailabilityPrev] = useState(false);

    const [statistic, setStatistic] = useState({
        "negative": {"count": 0, "percent": 0,},
        "neutral": {"count": 0, "percent": 0,},
        "positive": {"count": 0, "percent": 0,}
    });

    const setAdditionalInfo = () => {
        let ratingArray = Object.values(findRatingByYearAndMonth(currentYear, currentMonth, receivedData));
        setStatistic(getStatistic(ratingArray));
        setCurrentData(updateCurrentData(ratingArray, defaultData));
        let arrAvailability = availabilityValue(currentYear, currentMonth, receivedData);
        setAvailabilityPrev(arrAvailability[0]);
        setAvailabilityNext(arrAvailability[1]);
    }

    useEffect(() => {
        const d = new Date();
        let currMonth = d.getMonth();
        let currYear = d.getFullYear();
        setCurrentMonth(() => currMonth);
        setCurrentYear(() => currYear);
        try {
            setAdditionalInfo();
        } catch (e) {
            // console.log(e.message);
        }
    }, []);

    useEffect(() => {
        try {
            setAdditionalInfo();
        } catch (e) {
            // console.log(e.message);
        }
    }, [currentMonth]);


    const handleShowPrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    const handleShowNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentYear(currentYear + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    return (
        <div className={s.content}>
            <span className={s.header}>Индекс удовлетворенности клиентов NPS</span>
            <div className={s.button__container}>
                <button className={availabilityPrev ? s.switch__button_active : s.switch__button_disable}
                        onClick={handleShowPrevMonth}
                        disabled={!availabilityPrev}>
                    <img src={leftCSATIcon} alt="left"/>
                </button>

                <button className={availabilityNext ? s.switch__button_active : s.switch__button_disable}
                        onClick={handleShowNextMonth}
                        disabled={!availabilityNext}>
                    <img src={rightCSATIcon} alt="right"/>
                </button>
            </div>
            <div className={s.chart}>
                <BarChart currentData={currentData}/>
            </div>

            <div className={s.xAxes}>
                <span className={s.xAxes__negative}>{statistic.negative.percent}% ({statistic.negative.count})<br/>Негативные</span>
                <span className={s.xAxes__neutral}>{statistic.neutral.percent}% ({statistic.neutral.count})<br/>Нейтральные</span>
                <span className={s.xAxes__positive}>{statistic.positive.percent}% ({statistic.positive.count})<br/>Промоутеры</span>
            </div>

            <div className={s.month__footer}>
                <span className={s.month__label}>
                    {returnStringMonth(currentMonth)} {currentYear}
                </span>
            </div>
        </div>
    );
}


export default NPS;
