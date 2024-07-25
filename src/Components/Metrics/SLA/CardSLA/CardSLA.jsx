import React from 'react';
import s from '../sla.module.scss';

const CardSLA = ({title, breachedTime, onTime}) => {
    return(
        <div className={s.container}>
            <span className={s.title}>{title}</span>
            <div className={s.info__container}>
                <span className={s.breachedTime__value}>{breachedTime}</span>
                <span className={s.type__info}>просроченных</span>
            </div>

            <div className={s.info__container}>
                <span className={s.onTime__value}>{onTime}</span>
                <span className={s.type__info}>выполненных вовремя</span>
            </div>
        </div>
    )
}

export default CardSLA;