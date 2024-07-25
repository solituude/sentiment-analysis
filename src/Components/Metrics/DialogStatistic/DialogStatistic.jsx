import React from "react";
import s from './dialogStatistiс.module.scss';
import { Col, Row } from "react-bootstrap";
import allDialogsIcon from '../../../assets/img/homepages/allDialogs.svg';
import unfinishedDialogsIcon from '../../../assets/img/chats/unfinishedDialogs.svg';
import averageTimeIcon from '../../../assets/img/metrics/averageTime.svg';
import {connect} from 'react-redux';

const DialogStatistic = ({ quantityOfDialogs, unfinishedDialogs, avgProcessingTime }) => {

    const cards = [
        {
            id: 1,
            label: "Всего диалогов",
            number: quantityOfDialogs,
            iconLight: allDialogsIcon,
        },
        {
            id: 2,
            label: "Кол-во незавершенных диалогов",
            number: unfinishedDialogs,
            iconLight: unfinishedDialogsIcon,
        },
        {
            id: 3,
            label: "Среднее время обработки",
            number: avgProcessingTime,
            iconLight: averageTimeIcon,
        },
    ];

    return (
        <Row xs={12} className={s.content}>
            {
                cards.map((item) => (
                    <Col xs={4} className={s.col} key={item.id}>
                        <div className={s.card}>
                            <span className={s.card__label}>{item.label}</span>
                            <span className={s.card__number}>{item.number}</span>

                            <img src={item.iconLight} alt={'all'} className={s.card__icon} />
                        </div>
                    </Col>
                ))
            }
        </Row>
    );
}

const mapStateToProps = (store) => ({
    quantityOfDialogs: store.metrics.quantityOfDialogs,
    unfinishedDialogs: store.metrics.unfinishedDialogs,
    avgProcessingTime: store.metrics.avgProcessingTime,
})

export default connect(mapStateToProps)(DialogStatistic);