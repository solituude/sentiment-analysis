import React, {useCallback, useState} from 'react';

import {Calendar} from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import {arrangeDataForCharts, setNewSelectedDates} from "../../redux/chartsReducer/chartActions";
import {fromDateToString} from "../../helpers/merticsHelpers";
import {connect} from "react-redux";


const DualCalendar = (props) => {
    const [value, setValue] = useState([]);

    const onChange = useCallback(
        (val) => {
            setValue(val);
            props.setNewSelectedDates([fromDateToString(val[0]), fromDateToString(val[1])]);
            props.arrangeDataForCharts();
            props.setShowCalendar(false);
        },
        [setValue],
    );

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

    return (
            <Calendar weekDaysLabel={weekDaysLabel} useDarkMode monthsLabel={monthsLabel} noPadRangeCell showDualCalendar
                      isRangeSelector value={props.selectedDates} onChange={onChange}/>
    );

}

const mapStateToProps = (store) => ({
    selectedDates: store.chart.selectedDates,
})

export default connect(mapStateToProps, {arrangeDataForCharts, setNewSelectedDates})(DualCalendar);
