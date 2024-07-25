import React from 'react';
import './SentimentChart.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';

import ChartTest from './Chart/Chart';
import {connect} from "react-redux";

const ChartManager = ({ sentimentData, labels, lastTrueField }) => {

    return (
        <>
            <p className="text">Тональность общения</p>

            {sentimentData && labels ? (
                <ChartTest
                    values={sentimentData} // Массив со значениями тональности
                    labels={labels} // Подписи для точек (дата)
                    type={'sentiment'}
                    maxY={100}
                    lastTrueField={lastTrueField}
                />
            ) : (
                <div className='error_chart_loading'>
                    <div className="spinner" />
                </div>
            )}

        </>
    )
};

const mapStateToProps = (store) => ({
    sentimentData: store.chart.sentimentData,
    labels: store.chart.labelsData
})

export default connect(mapStateToProps)(ChartManager);