import React, {useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import CardSLA from "./CardSLA/CardSLA";
import {connect} from "react-redux";
import {requestSLA} from "../../../redux/metricsReducer/metricsActions";

const SLA = ({SLA, requestSLA}) => {
    useEffect(() => {
        requestSLA()
    }, []);

    const cardsInfo = [
        {
            id: 0,
            title: "Время ответа клиента",
            breachedTime: SLA.forFRT.breachedTime,
            onTime: SLA.forFRT.onTime,
        },
        {
            id: 1,
            title: "Время закрытия запроса",
            breachedTime: SLA.forART.breachedTime,
            onTime: SLA.forART.onTime,
        },
    ]

    return (
        <Row>
            {
                cardsInfo.map((item) => (
                    <Col xs={6} key={item.id}>
                        <CardSLA title={item.title} breachedTime={item.breachedTime} onTime={item.onTime}/>
                    </Col>
                ))
            }
        </Row>
    );
}

const mapStateToProps = (store) => ({
    SLA: store.metrics.SLA,
})

export default connect(mapStateToProps, {requestSLA})(SLA);