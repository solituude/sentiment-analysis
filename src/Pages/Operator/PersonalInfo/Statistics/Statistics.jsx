import React from "react";
import s from './statistics.module.scss';
import MeanTone from "./MeanTone";
import MeanTime from "./MeanTime";

const Statistics = () => {
    return(
        <div className={s.statistics__container}>
            <MeanTone/>
            <MeanTime/>
        </div>
    );
}

export default Statistics;