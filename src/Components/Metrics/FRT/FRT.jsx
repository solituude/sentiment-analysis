import React, {useEffect, useState} from "react";
import s from './frt.module.scss';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";

import Chart from '../../Charts/Chart/Chart';

import {averageFRT} from "../functions/functionsMetrics";
import {formatMinutes} from "../../../helpers/chartsDataHelpers";

const FRT = ({FRTData, labels, lastTrueField}) => {

    // const [selected, setSelected] = useState(localStorage.getItem("activeDate"));

    const [average, setAverage] = useState(0);

    useEffect(() => {
        if (FRTData.length > 0) {
            setAverage(averageFRT(FRTData));
        }
    }, [FRTData]);

    return (
        <Row xs={12}>
            <Col lg={3} xs={12}>
                <div className={s.average__col}>
                    <div className={s.average__item1}>
                        Среднее время первого ответа
                    </div>

                    <div className={s.average__item5}>
                        <span className={s.average__text}>
                            {average} {formatMinutes(average)}
                        </span>
                    </div>
                </div>
            </Col>

            <Col lg={9} xs={12}>
                <div className={s.chart}>
                    <div className={s.header}>
                        <span className={s.title}>
                            Время первого ответа FRT <span className={s.title__sub}>(минуты)</span>
                        </span>
                    </div>

                    {/*{isFetching ?*/}
                        <Chart maxY={500}
                               labels={labels}
                               values={FRTData}
                               type={"FRT"}
                               lastTrueField={lastTrueField}

                        />
                    {/*    <div className='error_chart_loading'>*/}
                    {/*        <div className="spinner"/>*/}
                    {/*    </div>*/}
                    {/*}*/}

                </div>

            </Col>
        </Row>
    )
}
const mapStateToProps = (store) => ({
    FRTData: store.chart.FRTData,
    labels: store.chart.labelsData,
})
export default connect(mapStateToProps)(FRT);