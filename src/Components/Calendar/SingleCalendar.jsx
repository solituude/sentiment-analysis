import React, { useCallback, useState } from 'react';

import { Calendar } from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import './DualCalendar.css';
import {connect} from "react-redux";
import {arrangeDataForCharts, handleSetSelectedOneDate} from "../../redux/chartsReducer/chartActions";
import {fromDateToString} from "../../helpers/merticsHelpers";


const SingleCalendar = ({arrangeDataForCharts, handleSetSelectedOneDate}) => {
    const [value, setValue] = useState([]);
    const monthsLabel = {
        0: 'Январь',
        1: 'Февраль',
        2: 'Март',
        3: 'Апрель',
        4: 'Мая',
        5: 'Июнь',
        6: 'Июль',
        7: 'Август',
        8: 'Сентябрь',
        9: 'Октябрь',
        10: 'Ноябрь',
        11: 'Декабрь',
    };

    const weekDaysLabel = {
        0: 'Вс',
        1: 'Пн',
        2: 'Вт',
        3: 'Ср',
        4: 'Чт',
        5: 'Пт',
        6: 'Сб',
    };


    const onChange = useCallback(
        (val) => {
            setValue(val);
            handleSetSelectedOneDate([fromDateToString(val)])
            arrangeDataForCharts();
        },
        [setValue],
    );

    return <Calendar value={value} weekDaysLabel={weekDaysLabel} monthsLabel={monthsLabel} onChange={onChange}  />

}


export default connect(null, {arrangeDataForCharts, handleSetSelectedOneDate})(SingleCalendar);