import React, { useEffect, useState} from "react";
import HeadBanner from "./HeadBanner/HeadBanner";
import st from '../../Manager/ManagerHomepage/managerhomepage.module.scss';
import {Col, Row} from "react-bootstrap";
import TimeFilter from "../../../Components/Metrics/TimeFilter/TimeFilter";
import ChartManager from "../../../Components/Charts/ChartManager";
import MeanTone from "./Statistics/MeanTone";
import MeanTime from "./Statistics/MeanTime";
import NTB from "../../../Components/Metrics/NTB/NTB";
import FRT from "../../../Components/Metrics/FRT/FRT";
import DialogStatistic from "../../../Components/Metrics/DialogStatistic/DialogStatistic";
import ART from "../../../Components/Metrics/ART/ART";
import CalendarDate from "../../Manager/ManagerHomepage/CalendarDate/CalendarDate";
import SLA from "../../../Components/Metrics/SLA/SLA";
import {findLastTrueField} from "../../../helpers/merticsHelpers";
import s from "../../Manager/ManagerHomepage/managerhomepage.module.scss";
import calendarIconLight from "../../../assets/img/homepages/calendarIconLight.svg";
import calendarIcon from "../../../assets/img/metrics/calendarIcon.svg";
import SingleCalendar from "../../../Components/Calendar/SingleCalendar";
import DualCalendar from "../../../Components/Calendar/DualCalendar";
import {connect} from "react-redux";
import {arrangeDataForCharts, requestDialogsInfo} from "../../../redux/chartsReducer/chartActions";
import {requestInfoForDialogStatistic, updateShowInfo} from "../../../redux/metricsReducer/metricsActions";
import MetricsList from "../../../Components/MetricsList/MetricsList";
import DisplayButton from "../../../UI/DisplayButton/DisplayButton";
import {ThemeContext} from "../../../contexts/ThemeContext";
import CSAT from "../../../Components/Metrics/CSAT/CSAT";

const PersonalInfo = ({showInfo,
                          requestDialogsInfo, arrangeDataForCharts, requestInfoForDialogStatistic, updateShowInfo}) => {
    useEffect(() => {
        requestDialogsInfo();
        requestInfoForDialogStatistic();
        updateShowInfo();
    });

    const [isCounterActive, setIsCounterActive] = useState(false);

    const [activeDate, setActiveDate] = useState(localStorage.getItem("activeDate") !== "null" ?
        localStorage.getItem("activeDate") : "dialogs")

    useEffect(() => {
        arrangeDataForCharts();
    }, [activeDate, arrangeDataForCharts]);

    const lastTrueField = findLastTrueField(showInfo);
    const [showCalendar, setShowCalendar] = useState(false);

    return (
        <div className={st.personal_info__content}>
            <ThemeContext.Consumer>
                {({theme}) => (<>
                    <HeadBanner/>
                    <div className={st.main__container}>
                        <Row xs={12}>
                            <div className={st.filters}>
                                <TimeFilter setActiveDate={setActiveDate}/>

                                <div className={st.calendar__container}>
                                    <button onClick={() => setShowCalendar(!showCalendar)} className={s.calendar__icon}>
                                        <img src={theme === 'light' ? calendarIconLight : calendarIcon}
                                             alt={'calendar'}></img>
                                    </button>

                                    {activeDate === "dialogs"
                                        ? (showCalendar && <SingleCalendar setShowCalendar={setShowCalendar}/>)
                                        : (showCalendar && <DualCalendar setShowCalendar={setShowCalendar}/>)}

                                </div>
                                <CalendarDate activeDate={activeDate}/>
                                <DisplayButton isCounterActive={isCounterActive}
                                               setIsCounterActive={setIsCounterActive}/>
                            </div>
                        </Row>

                        {isCounterActive ? <MetricsList setIsCounterActive={setIsCounterActive}/> : null}

                        <div className={st.data__container}>
                            <Row className={st.sentiment__container}>
                                {
                                    showInfo.sentiment ?
                                        <Col xl={showInfo.meanTime || showInfo.meanSentiment ? 8 : 12} xs={12}
                                             className="order-xl-0 order-1">
                                            <div className={st.chart__sentiment}>
                                                <ChartManager lastTrueField={lastTrueField}/>
                                            </div>
                                        </Col> : null
                                }
                                {
                                    showInfo.meanTime || showInfo.meanSentiment ?
                                        <Col xl={3} xs={12} className="order-xl-1 order-0">
                                            <div className={st.statistics__container}>
                                                {showInfo.meanSentiment ? <MeanTone/> : null}
                                                {showInfo.meanTime ? <MeanTime /> : null}
                                            </div>
                                        </Col> : null
                                }
                            </Row>
                            {showInfo.NTB ? <NTB/> : null}
                            {showInfo.FRT ? <FRT lastTrueField={lastTrueField}/> : null}
                            {showInfo.quantityStat ? <DialogStatistic /> : null}
                            {showInfo.ART ? <ART lastTrueField={lastTrueField}/> : null}
                            {showInfo.SLA ? <SLA/> : null}
                            {showInfo.CSAT ? <CSAT/> : null}
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
})(PersonalInfo);