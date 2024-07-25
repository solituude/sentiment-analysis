import React, {useEffect} from 'react';
import {Bar} from "react-chartjs-2";
import {getMaxValueY} from "../functions/barChartFunctions";

const BarChart = ({currentData}) => {
    const theme = localStorage.getItem('theme');
    const customColors = ['#FF3347', '#FD5A6A', '#FB818D', '#F9A7AF', '#F7CED2', '#A3ADB8', '#A3ADB8',
        '#B1DBB1', '#7EC77E', '#4BB34B'];
    const maxValueY = getMaxValueY(currentData);
    const labelsChart = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];


    const optionsChart = {
        // responsive: true,
        maintainAspectRatio: false,
        padding: 50,

        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },

            datalabels: {
                align: 'end',
                anchor: 'end',
                labels: {
                    count: {
                        color: '#818C99',
                        font: {size: 14, weight: 400, family: 'Roboto'},
                        formatter: function (value, context) {
                            return '(' + currentData[context.dataIndex].count + ')';
                        },
                    },

                    percent: {
                        padding: 20,
                        color: theme === 'light' ? '#000' : '#E1E3E6',
                        font: {size: 14, weight: 600, family: 'Roboto'},
                        formatter: function (value, context) {
                            return context.dataset.data[context.dataIndex] + '%'
                        },
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    offset: true,
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 400,
                        family: 'Roboto',
                        color: '#000',
                    },
                },
            },
            y: {
                max: maxValueY + 20 - maxValueY % 10,
                ticks: {
                    stepSize: 10,
                    font: {
                        size: 14,
                        weight: 600,
                        color: '#99A2AD',
                        family: 'Roboto',
                        style: 'normal',
                    },
                    callback: function (value) {
                        return value + '%';
                    },
                },
            },
        },
        onClick: (e) => {

        }
    };
    const dataChart = {
        labels: labelsChart,
        datasets: [{
            data: currentData.map((item) => item.percent),
            borderWidth: 0,
            borderRadius: 12,
            borderSkipped: false,
            backgroundColor: customColors.map((item) => item),
            barPercentage: 0.95,
            categoryPercentage: 1,
        }],
    };

    return(
        <Bar options={optionsChart} data={dataChart}/>
    );
}

export default BarChart;