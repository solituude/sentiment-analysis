import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from "react-bootstrap";
import s from "../ART/art.module.scss";
import Chart from "../../Charts/Chart/Chart";

const CSAT = ({lastTrueField, CSATData, labels}) => {
    return(
        <Row xs={12}>
            <Col lg={9} xs={12} className="order-lg-0 order-1">
                <div className={s.chart}>
                    <div className={s.header}>
                        <span className={s.title}>
                            Индекс удовлетворенности клиентов CSAT<span className={s.title__sub}>(проценты)</span>
                        </span>
                    </div>
                    {labels && CSATData ?
                        <div></div>
                        // <Chart
                        //     labels={labels}
                        //     maxY={500}
                        //     values={CSATData}
                        //     type={"CSAT"}
                        //     lastTrueField={lastTrueField} />
                        :
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
                            Средний индекс удовлетворенности клиентов
                        </span>
                    </div>

                    <div className={s.averageBlock__item5}>
                        <span className={s.averageBlock__value}>
                            Ы %
                        </span>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

const mapStateToProps = (store) => ({
    CSATData: store.chart.CSATData,
    labels: store.chart.labelsData
})

export default connect(mapStateToProps)(CSAT);