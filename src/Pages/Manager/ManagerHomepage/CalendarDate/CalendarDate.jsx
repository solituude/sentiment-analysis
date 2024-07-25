import React from 'react';
import s from '../managerhomepage.module.scss';
import {connect} from 'react-redux';
import {
    setNewSelectedDates,
    arrangeDataForCharts,
    handleSetSelectedOneDate
} from "../../../../redux/chartsReducer/chartActions";
import clearDateIcon from '../../../../assets/img/homepages/clearDate.svg';

const Calendar = (props) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        // console.log(dateString);
        const [day, month, year] = dateString.split('/');
        return `${day}.${month}.${year}`;
    };

    const handleClearDate = (e) => {
        e.preventDefault();
        props.activeDate === 'dialogs' ? props.handleSetSelectedOneDate([]) : props.setNewSelectedDates([]);
        props.arrangeDataForCharts();
    }

    return (
        <div className={s.date__container}>
            {props.selectedOneDate && props.selectedOneDate.length > 0 && props.activeDate === 'dialogs' ? (
                <span className={s.date__span}>{formatDate(props.selectedOneDate[0])}</span>
            ) : props.selectedDates && props.selectedDates.length > 1 && props.activeDate !== 'dialogs' ? (
                <span className={s.date__span}>
                        {formatDate(props.selectedDates[0])} — {formatDate(props.selectedDates[1])}
                    </span>
            ) : null}

            {props.selectedOneDate.length > 0 && props.activeDate === 'dialogs' ? <button onClick={handleClearDate} className={s.clearDate__button}>
                <img src={clearDateIcon} alt={'x'} width={24} height={24}/>
            </button> : null}
            {props.selectedDates.length > 0 && props.activeDate !== 'dialogs' ? <button onClick={handleClearDate} className={s.clearDate__button}>
                <img src={clearDateIcon} alt={'x'} width={24} height={24}/>
            </button> : null}
        </div>

    );
};

const mapStateToProps = (store) => ({
    selectedDates: store.chart.selectedDates,
    selectedOneDate: store.chart.selectedOneDate,
})

export default connect(mapStateToProps, {setNewSelectedDates, arrangeDataForCharts, handleSetSelectedOneDate})(Calendar);
