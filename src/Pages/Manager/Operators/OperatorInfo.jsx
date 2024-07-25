import React from "react";
import s from './operators.module.scss';
import HeadBanner from "../../Operator/PersonalInfo/HeadBanner/HeadBanner";
import ChartArea from "../../Operator/PersonalInfo/ChartArea/ChartArea";
import Statistics from "../../Operator/PersonalInfo/Statistics/Statistics";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import backIcon from '../../../assets/img/homepages/back.svg';

const OperatorInfo = () => {
    const navigate = useNavigate();

    const backToOperators = () => {
        navigate(-1);
    }

    return (
        <div className={s.personalInfo__container}>
            <Row>
                <HeadBanner/>
                <button onClick={backToOperators} className={s.back__button}>
                    <img src={backIcon} alt={"back"}/>
                </button>
            </Row>
            <Row className={s.main__container}>
                <Col xl={8} xs={12} className="order-xl-0 order-1">
                    <ChartArea/>
                </Col>
                <Col xl={3} xs={12} className="order-xl-1 order-0">
                    <Statistics/>
                </Col>
            </Row>
        </div>
    );
}

export default OperatorInfo;