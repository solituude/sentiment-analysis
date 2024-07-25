import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ManagerHeader from "./ManagerHeader/ManagerHeader";
import NTB from "../../../Components/Metrics/NTB/NTB";
import s from './managerhomepage.module.scss';
import FRT from "../../../Components/Metrics/FRT/FRT";
import DialogStatistic from "../../../Components/Metrics/DialogStatistic/DialogStatistic";
import ART from "../../../Components/Metrics/ART/ART";
import { ThemeContext } from "../../../contexts/ThemeContext";

import MeanTone from "../../Operator/PersonalInfo/Statistics/MeanTone";
import MeanTime from "../../Operator/PersonalInfo/Statistics/MeanTime";
import ChartManager from "../../../Components/Charts/ChartManager";
import TimeFilter from "../../../Components/Metrics/TimeFilter/TimeFilter";
import NPS from "../../../Components/Metrics/NPS/NPS";

import CalendarDate from "./CalendarDate/CalendarDate";
import calendarIcon from "../../../assets/img/metrics/calendarIcon.svg";
import calendarIconLight from '../../../assets/img/homepages/calendarIconLight.svg';
import DualCalendar from "../../../Components/Calendar/DualCalendar";
import SingleCalendar from "../../../Components/Calendar/SingleCalendar";

import SLA from "../../../Components/Metrics/SLA/SLA";
import MetricsList from "../../../Components/MetricsList/MetricsList";
import DisplayButton from "../../../UI/DisplayButton/DisplayButton";
import { arrangeDataForCharts, requestDialogsInfo } from "../../../redux/chartsReducer/chartActions";
import { connect } from "react-redux";
import {
    requestInfoForDialogStatistic,
    updateShowInfo
} from "../../../redux/metricsReducer/metricsActions";
import { findLastTrueField } from "../../../helpers/merticsHelpers";
import CSAT from "../../../Components/Metrics/CSAT/CSAT";

const ManagerHomepageV2 = (props) => {
    useEffect(() => {
        props.requestDialogsInfo();
        props.requestInfoForDialogStatistic();
        props.updateShowInfo();
    }, []);

    const [isCounterActive, setIsCounterActive] = useState(false);

    const [activeDate, setActiveDate] = useState(localStorage.getItem("activeDate") !== "null" ?
        localStorage.getItem("activeDate") : "dialogs")

    useEffect(() => {
        props.arrangeDataForCharts();
    }, [activeDate]);

    const lastTrueField = findLastTrueField(props.showInfo);
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <div className={s.personal_info__content}>
            <ThemeContext.Consumer>
                {({ theme }) => (<>
                    <ManagerHeader />
                    <div className={s.main__container}>
                        <Row xs={12}>
                            <div className={s.filters}>
                                <TimeFilter setActiveDate={setActiveDate} />

                                <div className={s.calendar__container}>
                                    <button onClick={() => setShowCalendar(!showCalendar)} className={s.calendar__icon}>
                                        <img src={theme === 'light' ? calendarIconLight : calendarIcon} alt={'calendar'}></img>
                                    </button>

                                    {activeDate === "dialogs"
                                        ? (showCalendar && <SingleCalendar setShowCalendar={setShowCalendar} />)
                                        : (showCalendar && <DualCalendar setShowCalendar={setShowCalendar} />)}

                                </div>

                                <CalendarDate activeDate={activeDate} />
                                <DisplayButton isCounterActive={isCounterActive}
                                    setIsCounterActive={setIsCounterActive} />
                            </div>
                        </Row>

                        {isCounterActive ? <MetricsList setIsCounterActive={setIsCounterActive} />
                            : null}

                        <div className={s.data__container}>
                            <Row className={s.sentiment__container}>
                                {
                                    props.showInfo.sentiment ?
                                        <Col xl={props.showInfo.meanTime || props.showInfo.meanSentiment ? 8 : 12} xs={12}
                                            className="order-xl-0 order-1">
                                            <div className={s.chart__sentiment}>
                                                <ChartManager lastTrueField={lastTrueField} />
                                            </div>
                                        </Col> : null
                                }
                                {
                                    props.showInfo.meanTime || props.showInfo.meanSentiment ?
                                        <Col xl={3} xs={12} className="order-xl-1 order-0">
                                            <div className={s.statistics__container}>
                                                {props.showInfo.meanSentiment ? <MeanTone /> : null}
                                                {props.showInfo.meanTime ? <MeanTime /> : null}
                                            </div>
                                        </Col> : null
                                }
                            </Row>

                            {props.showInfo.NTB ? <NTB /> : null}
                            {props.showInfo.FRT ? <FRT lastTrueField={lastTrueField} /> : null}
                            {props.showInfo.quantityStat ? <DialogStatistic /> : null}
                            {props.showInfo.ART ? <ART lastTrueField={lastTrueField} /> : null}
                            {props.showInfo.NPS ? <NPS /> : null}
                            {props.showInfo.SLA ? <SLA /> : null}
                            {props.showInfo.CSAT ? <CSAT /> : null}
                        </div>
                    </div>
                </>)
                }
            </ThemeContext.Consumer>
        </div>
    )
}

const mapStateToProps = (store) => ({
    showInfo: store.metrics.showInfo,
});

export default connect(mapStateToProps, {
    requestDialogsInfo, arrangeDataForCharts,
    requestInfoForDialogStatistic, updateShowInfo
})(ManagerHomepageV2);
