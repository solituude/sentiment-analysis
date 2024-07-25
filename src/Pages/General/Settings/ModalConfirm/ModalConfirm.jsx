import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import './modalConfirm.scss';
import closeModalSettingsIcon from '../../../../assets/img/settings/closeModalSettings.svg';
import s from "../../LogIn/contentLogin/form.module.css";
import hidePasswordIcon from "../../../../assets/img/settings/hidePassword.svg";
import {NavLink} from "react-router-dom";

const ModalConfirm = (props) => {

    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleContinue = () => {
        window.location.href = '/settings/passwordChange';
    }

    return (

        <Modal open={props.show} onClose={props.onClose} className="modalConfirm">
            <div className="modalConfirm__items">

                <div className="modalConfirm__container">
                    <span className="modalConfirm__header">
                        Введите пароль
                    </span>

                    <span className="modalConfirm__info">
                        Для продолжения необходимо подтвердить, что вы являетесь владельцем аккаунта
                    </span>

                    <div className={s.input_container}>
                        <input type={showPassword ? "text" : "password"}
                               className={s.textarea_password}
                               value={password}
                               placeholder={"Введите пароль"}
                               onChange={(e) => setPassword(e.target.value)}/>

                        <img src={hidePasswordIcon}
                             alt="eye"
                             className={s.show_password}
                             onClick={toggleShowPassword}/>
                    </div>

                    <div className="modalConfirm__forget">
                        Забыли пароль?
                    </div>

                    <div className="modalConfirm__groupButton">
                        <button className="modalConfirm__cancelButton" onClick={props.onClose}>
                            Отмена
                        </button>
                        <NavLink to={'/settings/passwordChange'}>
                            <button className={password.length !== 0 ? "modalConfirm__continueButton_active" : "modalConfirm__continueButton_disable"}
                                    disabled={password.length === 0} onClick={handleContinue}>
                                Продолжить
                            </button>
                        </NavLink>

                    </div>

                </div>


                <button className="modalConfirm__closeButton" onClick={props.onClose}>
                    <img src={closeModalSettingsIcon} alt={"close"}/>
                </button>
            </div>
        </Modal>

    )
}

export default ModalConfirm;