import React from "react";
import './statistics.module.scss';
import s from "./statistics.module.scss";
import {formatMinutes} from '../../../../helpers/chartsDataHelpers';
import {connect} from "react-redux";

const MeanTime = ({currentAverageTime}) => {

    return (
        <div className={s.mean__container}>
            <label className={s.statistics__label}>
                Среднее время закрытия запроса
            </label>
            <div className={s.info__field}>
                <div className={s.circle__1_time}>
                    <div className={s.circle__2_time}>
                        <div className={s.circle__3_time}>
                            <div className={s.circle__4_time}>
                                <div className={s.circle__5_time}>
                                    <span className={s.value__mean_time}>
                                        {currentAverageTime} {formatMinutes(currentAverageTime)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => ({
    currentAverageTime: store.metrics.currentAverageTime,
})

export default connect(mapStateToProps)(MeanTime);