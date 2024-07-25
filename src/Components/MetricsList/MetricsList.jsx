import React, {useCallback, useEffect} from 'react';
import {ClickAwayListener} from "@mui/material";
import s from "../../Pages/Manager/ManagerHomepage/managerhomepage.module.scss";
import Form from "react-bootstrap/Form";
import {connect} from 'react-redux';
import {setNewShowInfo, updateShowInfo} from "../../redux/metricsReducer/metricsActions";

const MetricsList = ({setIsCounterActive, showInfo, setNewShowInfo, updateShowInfo}) => {
    const role = localStorage.getItem('role');

    const updateShowInfoCallback = useCallback(() => {
        updateShowInfo();
    }, [updateShowInfo]);

    useEffect(() => {
        updateShowInfoCallback();
    }, [showInfo, updateShowInfoCallback]);

    const graphicsStates = [
        {
            name: "Тональность общения",
            isShow: showInfo.sentiment,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, sentiment: newValue}),
        },
        {
            name: "Средняя тональность",
            isShow: showInfo.meanSentiment,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, meanSentiment: newValue}),
        },
        {
            name: "Среднее время закрытия запроса",
            isShow: showInfo.meanTime,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, meanTime: newValue}),
        },
        {
            name: "Количество просроченных обращений ",
            isShow: showInfo.NTB,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, NTB: newValue}),
        },
        {
            name: "Время первого ответа",
            isShow: showInfo.FRT,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, FRT: newValue}),
        },
        {
            name: "Количественная статистика по диалогам",
            isShow: showInfo.quantityStat,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, quantityStat: newValue}),
        },
        {
            name: "Время решения запроса",
            isShow: showInfo.ART,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, ART: newValue}),
        },
        {
            name: "SLA",
            isShow: showInfo.SLA,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, SLA: newValue}),
        },
        {
            name: "Индекс удовлетворенности клиентов CSAT",
            isShow: showInfo.CSAT,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, CSAT: newValue}),
        },
    ];

    if (role === 'manager') {
        graphicsStates.push({
            name: "Индекс удовлетворенности клиентов NPS",
            isShow: showInfo.NPS,
            setIsShow: (newValue) => setNewShowInfo({...showInfo, NPS: newValue}),
        })
    }

    return(
        <ClickAwayListener onClickAway={() => setIsCounterActive(false)}>
            <div className={s.dropdown}>
                {
                    graphicsStates.map((item) => (
                        <div className={s.dropdown__item} key={item.name}>
                            <Form.Check
                                checked={item.isShow}
                                onChange={() => item.setIsShow(!item.isShow)}
                                type="checkbox"
                                id={item.name}
                                label={item.name}
                            />
                        </div>
                    ))
                }
            </div>
        </ClickAwayListener>
    )
}

const mapStateToProps = (store) => ({
    showInfo: store.metrics.showInfo,
})

export default connect(mapStateToProps, {setNewShowInfo, updateShowInfo})(MetricsList);