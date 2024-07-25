import React from "react";
import { Col, Row } from "react-bootstrap";
import s from './art.module.scss';
import Chart from '../../Charts/Chart/Chart';
import {connect} from "react-redux";
import {formatMinutes} from "../../../helpers/chartsDataHelpers";

const ART = ({ ARTData, labels, lastTrueField, currentAverageTime }) => {
    return (
        <Row xs={12}>
            <Col lg={9} xs={12} className="order-lg-0 order-1">
                <div className={s.chart}>
                    <div className={s.header}>
                        <span className={s.title}>
                            Время решения запроса ART <span className={s.title__sub}>(минуты)</span>
                        </span>
                    </div>
                    {labels && ARTData ?
                        <Chart
                            labels={labels}
                            maxY={500}
                            values={ARTData}
                            type={"ART"}
                            lastTrueField={lastTrueField} /> :
                        <div className='error_chart_loading'>
                            <div className="spinner" />
                        </div>
                    }
                </div>
            </Col>

            <Col lg={3} xs={12} className="order-lg-1 order-0">
                <div className={s.averageBlock}>
                    <div className={s.averageBlock__item1}>
                        <span className={s.averageBlock__label}>
                            Среднее время решения запроса
                        </span>
                    </div>

                    <div className={s.averageBlock__item5}>
                        <span className={s.averageBlock__value}>
                            {currentAverageTime} {formatMinutes(currentAverageTime)}
                        </span>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
const mapStateToProps = (store) => ({
    ARTData: store.chart.ARTData,
    currentAverageTime: store.metrics.currentAverageTime,
    labels: store.chart.labelsData
})
export default connect(mapStateToProps)(ART);