import React, {useEffect, useRef, useState, useMemo} from 'react';
import {Line} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {CategoryScale, Chart as ChartJS} from 'chart.js';
import Chart from 'chart.js/auto';
import {getValueForPixel} from 'chart.js/helpers';
import annotationPlugin from "chartjs-plugin-annotation";
import s from './chart.module.scss';
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import {connect} from "react-redux";
import {setNewIndexOfLastDisplayedItem} from "../../../redux/chartsReducer/chartActions";

const ChartSentiment = ({values, labels, lastTrueField, type, maxY, setNewIndexOfLastDisplayedItem,
                            indexOfLastDisplayedItem}) => {
    const chartRef = useRef(null);
    ChartJS.register(annotationPlugin);
    ChartJS.register(zoomPlugin)

    const [showWindow, setShowWindow] = useState(false);
    const [windowData, setWindowData] = useState([]);
    const [coordinates, setCoordinates] = useState({x: null, y: null});

    const maxX = indexOfLastDisplayedItem;
    const minX = values.length > 7 ? indexOfLastDisplayedItem - 7 : 0;

    const role = localStorage.getItem('role');
    const selected = localStorage.getItem('activeDate');

    useEffect(() => {

        setNewIndexOfLastDisplayedItem(values.length - 1)

        const dateValues = {
            minXValue: values.length >= 7 ? values.length - 1 - 6 : 0,
            maxXValue: values.length - 1
        }
    }, [values]);


    const handlePan = (event) => {
        const xAxis = chartRef.current.scales.x;
        const minXValue = xAxis.min;
        const maxXValue = xAxis.max;

        setNewIndexOfLastDisplayedItem(maxXValue);

        const dateValues = {
            minXValue,
            maxXValue
        }
        // changeDateCalendar(dateValues);
    };


    const chartData = useMemo(() => {
        return {
            labels: labels,
            datasets: [
                {
                    label: '',
                    data: values,
                    fill: false,
                    borderColor: '#8B74FF',
                    backgroundColor: '#8B74FF',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderWidth: "2px",
                    tension: 0.2,
                },
            ],
        };
    }, [values, labels]);

    const chartOptions = {
        maintainAspectRatio: false,
        animation: {
            responsive: false,
            duration: 0,
        },
        scales: {
            y: {
                display: true,
                min: 0,
                max: maxY,
                ticks: {
                    stepSize: 20,
                    reverse: true,
                    callback: function (value) {
                        if (type === 'sentiment' || type === 'CSAT') {
                            return value + "%";
                        } else if (type === 'ART' || type === 'FRT') {
                            return value;
                        }
                    }
                },
                grid: {
                    color: 'rgba(108,108,108,0.16)'
                }
            },
            x: {
                display: true,
                title: {
                    display: true
                },

                min: minX,
                max: maxX,
                ticks: {
                    stepSize: 0.5,
                },
                offset: true,
                start: minX === null ? (values.length >= 7 ? values.length - 1 - 6 : 0) : minX,
                grid: {
                    color: 'rgba(108,108,108,0.16)'
                }
            },

        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            annotation: {
                annotations: {
                    line: {
                        type: 'line',
                        borderColor: "#ff7f50",
                        borderWidth: type === 'sentiment' ? 2 : 0,
                        scaleID: 'y',
                        value: 60,
                        drawTime: 'beforeDatasetsDraw',
                    }
                }
            },
            tooltip: {
                enabled: false,
                position: 'nearest',
            },
            zoom: {
                pan: {
                    enabled: values.length > 7,
                    mode: 'x',
                    onPanComplete: handlePan, // Вызываем handlePan при перемещении графика
                },
            },

            datalabels: {
                display: false,
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const firstPoint = elements[0];
                const defaultMargin = 84;

                const yValue = firstPoint.element.$context.raw;
                const xValue = firstPoint.element.$context.index;

                if (minX <= xValue && xValue <= maxX) {
                    setNewIndexOfLastDisplayedItem(maxX);
                    setCoordinates({x: firstPoint.element.x, y: firstPoint.element.y})
                } else {
                    setNewIndexOfLastDisplayedItem(maxX + 6);
                    setCoordinates({x: 88, y: firstPoint.element.y})
                }

                setWindowData([yValue, xValue]);
                setShowWindow(true);
            }
        },
    };


    const operator = [{
        id: 1,
        name: "Иван Иванов",
        result: -3,
        percent: 28,
        countDialogs: 12,

    }]

    const operatorsList = [
        {
            id: 1,
            name: "Иван Иванов",
            result: -3,
            percent: 28,
            countDialogs: 12,
        },
        {
            id: 2,
            name: "Олег Олегов",
            result: 45,
            percent: 98,
            countDialogs: 58,
        },
        {
            id: 3,
            name: "Константин Константинов",
            percent: 32,
            countDialogs: 138,
        }
    ]

    const plugins = [zoomPlugin];

    const handleSetMinMax = (minXValue, maxXValue) => {
        setNewIndexOfLastDisplayedItem(maxXValue);
    }


    const handleWheel = (event, chart) => {
        const countPoints = values.length;
        if ((event.deltaY < -8 && event.deltaX === 0) || event.deltaX < -8) {
            if (minX > 0 && maxX - minX >= 6) {
                let minXValue = minX - 1;
                let maxXValue = maxX - 1;
                handleSetMinMax(minXValue, maxXValue)
            }

            if (minX === 0 && maxX > 7) {
                let minXValue = minX;
                let maxXValue = maxX - 1;
                handleSetMinMax(minXValue, maxXValue)
            }

            if (minX < 0) {
                let minXValue = 0;
                let maxXValue = countPoints < 7 ? countPoints - 1 : 6;
                handleSetMinMax(minXValue, maxXValue)
            }
        }
        if ((event.deltaY > 8 && event.deltaX === 0) || event.deltaX > 8) {
            if (maxX < countPoints - 1) {
                let minXValue = minX + 1;
                let maxXValue = maxX + 1;
                handleSetMinMax(minXValue, maxXValue)
            }
            if (maxX === countPoints - 1 && maxX - minX >= 7) {
                let minXValue = minX + 1;
                let maxXValue = maxX;
                handleSetMinMax(minXValue, maxXValue)
            }
            if (maxX > countPoints - 1) {
                let minXValue = maxX - minX < 6 ? 0 : countPoints - 7;
                let maxXValue = countPoints - 1;
                handleSetMinMax(minXValue, maxXValue)
            }
        }
    }

    const [disableScroll, setDisableScroll] = useState(false);

    const blockElement = document.getElementById(`chart${type}`);

    const handleMouseEnter = () => {
        setDisableScroll(true);
    };

    const handleMouseLeave = () => {
        setDisableScroll(false);
    };

    // обработчик события наведения мыши на график
    blockElement?.addEventListener('mouseenter', handleMouseEnter);
    blockElement?.addEventListener('mouseleave', handleMouseLeave);

    useEffect(() => {
        return () => {
            blockElement?.removeEventListener('mouseenter', handleMouseEnter);
            blockElement?.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, []);

    useEffect(() => {
        const scrollableElement = document.body;

        if (disableScroll) {
            scrollableElement.style.overflow = 'hidden';
        } else {
            scrollableElement.style.overflow = '';
        }
    }, [disableScroll]);


    return (
        values.length <= 0 ? (<div className={s.nodata__container}>Данных нет</div>) : (
            <div id={`chart${type}`}>
                <Line data={chartData}
                      onWheel={(e) => {
                          setShowWindow(false); // скрывает подсказку при срколле графика
                          if (values.length >= 6 && maxX >= 0 && minX >= 0 && maxX - minX >= 6) {
                              handleWheel(e, chartRef);
                          }
                      }}
                      options={chartOptions} plugins={plugins} className={s.content} ref={chartRef}/>

                {showWindow && (role === 'manager') && <CustomTooltip setShowWindow={setShowWindow}
                                                                      lastTrueField={lastTrueField}
                                                                      coordinates={coordinates}
                                                                      windowData={windowData}
                                                                      labels={labels}
                                                                      type={type}
                                                                      list={selected === "dialogs" ? operator : operatorsList}
                />}
            </div>
        )
    )
}

const mapStateToProps = (store) => ({
    indexOfLastDisplayedItem: store.chart.indexOfLastDisplayedItem,
    isFetching: store.chart.isFetching,
})
export default connect(mapStateToProps, {setNewIndexOfLastDisplayedItem})(ChartSentiment);