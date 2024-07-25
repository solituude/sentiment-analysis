import React from "react";
import { useState, useEffect } from 'react';
import './chartarea.scss';
import SentimentChart from "../../../../Components/Charts/SentimentChart";
const ChartArea = () => {
    const [dialogaDate, setDialogsDate] = useState([]);
    let getHistory = async () => {
        let response = await fetch('/chats/dialogs/getInfo/')
        let data = await response.json()
        setDialogsDate(data)
    }

    useEffect(() => {
        getHistory()
    }, []);   

    return(
        <div className="chart_area__content">
            <SentimentChart data={dialogaDate} />
        </div>
    );
}

export default ChartArea;