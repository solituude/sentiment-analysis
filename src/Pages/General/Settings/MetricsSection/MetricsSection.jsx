import React, { useState } from 'react';
import s from '../settings.module.scss';
import Switch from '@mui/material/Switch';

const MetricsSection = () => {
    const [timeAnswerClient, setTimeAnswerClient] = useState('number');
    const [timeCloseDialog, setTimeCloseDialog] = useState('number');
    const [avgTimeDialog, setAvgTimeDialog] = useState('number');


    return (
        <>
            <div className={s.metrics__container}>
                <div className={s.metrics__header}>
                    <span className={s.text__header}>Соглашение об уровне обслуживания SLA</span>
                    <span className={s.text__subheader}>(минуты) </span>
                </div>

                <div className={s.metric}>
                    <span className={s.metric__subhead}>
                        Время ответа клиента
                    </span>

                    <div className={s.metric__toggles}>
                        <button onClick={() => setTimeAnswerClient('number')}
                            className={timeAnswerClient === 'number' ? s.metric__toggles_active : s.metric__toggles_disable}>
                            Число
                        </button>
                        <button onClick={() => setTimeAnswerClient('interval')}
                            className={timeAnswerClient === 'interval' ? s.metric__toggles_active : s.metric__toggles_disable}>
                            Интервал
                        </button>
                    </div>
                    {
                        timeAnswerClient === 'number' ?
                            <div className={s.number}>
                                <input className={s.number__input} />
                            </div> :

                            <div className={s.interval}>
                                <div className={s.number}>
                                    <input className={s.number__input} />
                                </div>

                                <div className={s.dash} />

                                <div className={s.number}>
                                    <input className={s.number__input} />
                                </div>
                            </div>
                    }
                </div>

                <div className={s.divider} />

                <div className={s.metric}>
                    <span className={s.metric__subhead}>
                        Время закрытия запроса
                    </span>

                    <div className={s.metric__toggles}>
                        <button onClick={() => setTimeCloseDialog('number')}
                            className={timeCloseDialog === 'number' ? s.metric__toggles_active : s.metric__toggles_disable}>
                            Число
                        </button>
                        <button onClick={() => setTimeCloseDialog('interval')}
                            className={timeCloseDialog === 'interval' ? s.metric__toggles_active : s.metric__toggles_disable}>
                            Интервал
                        </button>
                    </div>
                    {
                        timeCloseDialog === 'number' ?
                            <div className={s.number}>
                                <input className={s.number__input} />
                            </div> :

                            <div className={s.interval}>
                                <div className={s.number}>
                                    <input className={s.number__input} />
                                </div>

                                <div className={s.dash} />

                                <div className={s.number}>
                                    <input className={s.number__input} />
                                </div>
                            </div>
                    }
                </div>

                <div className={s.divider} />

                <div className={s.metric}>
                    <span className={s.metric__subhead}>
                        Среднее время работы с клиентом
                    </span>

                    <div className={s.metric__toggles}>
                        <button onClick={() => setAvgTimeDialog('number')}
                            className={avgTimeDialog === 'number' ? s.metric__toggles_active : s.metric__toggles_disable}>
                            Число
                        </button>
                        <button onClick={() => setAvgTimeDialog('interval')}
                            className={avgTimeDialog === 'interval' ? s.metric__toggles_active : s.metric__toggles_disable}>
                            Интервал
                        </button>
                    </div>
                    {
                        avgTimeDialog === 'number' ?
                            <div className={s.number}>
                                <input className={s.number__input} />
                            </div> :

                            <div className={s.interval}>
                                <div className={s.number}>
                                    <input className={s.number__input} />
                                </div>

                                <div className={s.dash} />

                                <div className={s.number}>
                                    <input className={s.number__input} />
                                </div>
                            </div>
                    }
                </div>

                <button className={s.save__btn}>
                    Сохранить
                </button>

            </div>

            <div className={s.metrics__container2}>
                <div className={s.metrics__header}>
                    <span className={s.text__header}>Рассылка клиентам</span>
                </div>

                <div className={s.metrics2}>
                    <div className={s.header}>
                        <span>NPS</span>
                        <Switch />
                    </div>
                    <span className={s.sub__header}>Текст рассылки</span>
                    <textarea className={s.input}></textarea>
                </div>

                <button className={s.send__btn}>
                    Отправить сейчас
                </button>

                <div className={s.divider} />

                <div className={s.metrics2}>
                    <div className={s.header}>
                        <span>CSAT</span>
                        <Switch />
                    </div>
                    <span className={s.sub__header}>Текст рассылки</span>
                    <textarea className={s.input}></textarea>
                </div>

                <button className={s.save__btn}>
                    Сохранить
                </button>

            </div>
        </>
    )
}

export default MetricsSection;