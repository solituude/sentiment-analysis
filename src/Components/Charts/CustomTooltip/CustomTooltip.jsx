import {ClickAwayListener} from "@mui/material";
import s from "../Chart/chart.module.scss";
import closeTooltipIcon from "../../../assets/img/metrics/closeTooltip.svg";
import avaTestIcon from "../../../Pages/Manager/Operators/avaTest.svg";
import React, {useEffect, useRef, useState} from "react";


const chartType = {
    "sentiment": {
        "header": "Среднее значение тональности по всем операторам",
        "value": "%"
    },
    "FRT": {
        "header": "Среднее время первого ответа по всем операторам",
        "value": "мин"
    },
    "ART": {
        "header": "Среднее время решения запроса по всем операторам",
        "value": "мин"
    },
}
const CustomTooltip = (props) => {
    const currentType = props.type;
    const listRef = useRef();
    const [deltaY, setDeltaY] = useState(props.lastTrueField === currentType ?
        -436 - listRef.current?.clientHeight : -436);


    useEffect(() => {
        // console.log('ref', listRef)
        setDeltaY(props.lastTrueField === currentType ? -436 - listRef.current?.clientHeight : -436);
    }, [props.coordinates])

    // useEffect(() => {
    //     props.setShowWindow(false);
    // }, [props.labels])

    return (
        <ClickAwayListener onClickAway={() => {
            props.setShowWindow(false);}
        }>

            <div className={s.list} ref={listRef}
                 style={{marginLeft: `${props.coordinates.x}px`, marginTop: `${deltaY + props.coordinates.y}px`}}>
                <div className={s.header}>
                    <div className={s.title}>
                        <div className={s.header__content}>
                            {props.windowData[0]}{chartType[currentType].value}
                            <div className={s.subtitle}>{props.labels[props.windowData[1]]}</div>
                        </div>

                        <button className={s.close__button} onClick={() => {
                            props.setShowWindow(false);
                            // if (currentType === 'sentiment') {
                            //     props.setShowTooltipSentiment(false);
                            // } else if (currentType === 'FRT') {
                            //     props.setShowTooltipFRT(false);
                            // } else if (currentType === 'ART') {
                            //     props.setShowTooltipART(false);
                            // }
                        }}>

                            <img src={closeTooltipIcon} style={{height: "24px"}} alt={"x"}/>
                        </button>
                    </div>
                    <div className={s.subtitle__header}>
                        {chartType[currentType].header}
                    </div>

                </div>

                <div className={s.list__content}>
                    {
                        props.list.map((item) => (
                            <div className={s.item__list} key={item.id}>
                                <img src={avaTestIcon} alt="ava" className={s.item__icon}/>
                                <div className={s.item__middle}>
                                    <span className={s.item__name}>{item.name}</span>

                                    {item.result ?
                                        (item.result > 0 ? <span
                                                className={s.item__result_good}>+{item.result}{chartType[currentType].value}</span> :
                                            <span
                                                className={s.item__result_bad}>{item.result}{chartType[currentType].value}</span>)
                                        : null}

                                    <div className={s.item__info}>
                                        <span
                                            className={s.item__percent}>{item.percent}{chartType[currentType].value}</span>

                                        {
                                            currentType === "sentiment" ? <span
                                                className={s.item__count}>{item.countDialogs} закрытых диалогов</span> : null
                                        }

                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </ClickAwayListener>

    )
}

export default CustomTooltip;