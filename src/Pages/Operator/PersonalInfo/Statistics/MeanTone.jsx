import React from "react";
import './statistics.module.scss';
import s from "./statistics.module.scss";
import {connect} from "react-redux";

const MeanTone = ({currentAverageSentiment}) => {
    return(
        <div className={s.mean__container}>

            <p className={s.statistics__label}>
                Средняя тональность
            </p>

            <div className={s.info__field}>
                <div className={s.circle__1_tone}>
                    <div className={s.circle__2_tone}>
                        <div className={s.circle__3_tone}>
                            <div className={s.circle__4_tone}>
                                <div className={s.circle__5_tone}>
                                    <div className={s.value__mean_tone}>
                                        {currentAverageSentiment}%
                                    </div>
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
    currentAverageSentiment: store.metrics.currentAverageSentiment,
})

export default connect(mapStateToProps)(MeanTone);