import React, {useState} from 'react';
import s from "../settings.module.scss";
import changingPasswordIcon from "../../../../assets/img/settings/changingPassword.svg";
import rightSettingsIcon from "../../../../assets/img/settings/rightSettings.svg";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import {NavLink} from "react-router-dom";
import exitIcon from "../../../../assets/img/settings/exit.svg";

const SecuritySection = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <>
            <div className={s.loginConfirmation}>
                <p className={s.loginConfirmation__header}>
                    Подтверждение входа
                </p>

                <button className={s.loginConfirmation__button} onClick={handleShowModal}>
                    <div className={s.changingPassword}>
                        <img src={changingPasswordIcon} alt={"chP"} className={s.changingPassword__img}/>

                        <div className={s.changingPassword__title}>
                                    <span>
                                         Изменение пароля
                                    </span>

                            <span className={s.changingPassword__info}>
                                        Обновлен три года назад
                                    </span>
                        </div>

                    </div>
                    <img src={rightSettingsIcon} alt={"more"} className={s.loginConfirmation__img}/>
                </button>

                {showModal ? <ModalConfirm show={showModal} onClose={handleHideModal}/> : null}
            </div>


            <NavLink to='/logout' className={s.settingsContent__link}>
                <button className={s.settingsContent__exitButton}>
                    <div className={s.exitButton__container}>
                        <img src={exitIcon} alt={"exit"} className={s.settingsContent__icon}/>
                        Выйти
                    </div>
                    <img src={rightSettingsIcon} alt={"more"} className={s.loginConfirmation__img}/>
                </button>
            </NavLink>
        </>
    )
}

export default SecuritySection;
