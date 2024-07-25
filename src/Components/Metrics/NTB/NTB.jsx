import React, {useEffect} from "react";
import s from './ntb.module.scss';
import {Row} from "react-bootstrap";
import {connect} from 'react-redux';
import {requestNTB} from "../../../redux/metricsReducer/metricsActions";

const NTB = (props) => {
    useEffect(() => {
        props.requestNTB();
    }, [])

    return (
        <Row xs={12} className={s.row}>
            <div className={s.container}>
                <p className={s.container__text}>
                    Количество просроченных обращений NTB
                </p>
                <div className={s.container__circle}>
                    <div className={s.container__circle1}></div>
                    <div className={s.container__circle2}></div>
                    <div className={s.container__circle3}>
                        {props.NTB}
                    </div>
                </div>
            </div>
        </Row>
    );
}

const mapStateToProps = (store) => ({
    NTB: store.metrics.NTB,
})

export default connect(mapStateToProps, {requestNTB})(NTB);