import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import s from './recoverypassword.module.css'

const RecoveryPassword = () => {
    const [userEmail, setUserEmail] = useState("");
    const [showCheckComponent, setShowCheckComponent] = useState(false);
    const [seconds, setSeconds] = useState(59);
    const [timerActive, setTimerActive] = useState(false);

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handleButtonClick = () => {
        setShowCheckComponent(true);
    }

    useEffect(() => {
        if (seconds > 0 && timerActive) {
            setTimeout(setSeconds, 1000, seconds - 1);
        } else {
            setTimerActive(false);
        }
    }, [seconds, timerActive]);

    return (
        <div className={s.content}>
            {showCheckComponent ?
                (<div className={s.main_block}>
                    <p className={s.heading_container}>
                        Проверьте почту
                    </p>

                    <p className={s.text_container_check}>
                        Чтобы создать новый пароль, перейдите по ссылке в письме, мы отправили его на {userEmail}.
                    </p>

                    {seconds
                        ? <p className={s.text_container_check}>Если вы не получили письмо, нажмите «Отправить повторно»
                            через 00:{seconds} или напишите на наша-почта@ru</p>

                        : 
                        <button className={s.btn_send} onClick={
                            () => {
                                setTimerActive(true);
                                setSeconds(59);
                            }
                        }>
                            Отправить повторно
                        </button>
                    }
                    <p className={s.signin_container}>
                        У вас есть профиль? 
                        <NavLink to='/login'className={s.signin_link}> Войдите</NavLink>
                    </p>
                </div>)
                :
                (<div className={s.main_block}>
                    <p className={s.heading_container}>
                        Восстановление пароля   
                    </p>

                    <p className={s.text_container_recovery}>
                        Укажите, куда отправить инструкции для восстановления пароля.
                    </p>

                    <form className={s.form}>
                        <label className={s.subhead}>Почта</label>
                        <input className={s.input_container} onChange={handleEmailChange}/>
                    </form>

                    <button className={s.btn_send} onClick={() => {
                        handleButtonClick();
                        setTimerActive(true);
                    }}>
                        Отправить
                    </button>
                
                    <p className={s.signin_container}>
                        У вас есть профиль? 
                        <NavLink to='/login'className={s.signin_link}>Войдите</NavLink>
                    </p>
                </div>)
            }
        </div>
    )
}


export default RecoveryPassword;
