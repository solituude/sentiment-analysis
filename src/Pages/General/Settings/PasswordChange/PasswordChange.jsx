import React, {useState} from "react";
import {Container} from "react-bootstrap";
import './passwordChange.scss';
import backIcon from '../../../img/PasswordChangeBack.svg';
import lockIcon from '../../../img/PasswordChangeLock.svg';
import s from "../../LogIn/contentLogin/form.module.scss";
import hidePasswordIcon from "../../../../assets/img/settings/hidePassword.svg";
import clearIcon from '../../../img/PasswordChangeClear.svg';
import successIcon from '../../../img/successChanging.svg';
import {useNavigate} from "react-router-dom";

const PasswordChange = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [repeatPass, setRepeatPass] = useState('');
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const [showError, setShowError] = useState(false);
    const [successChange, setSuccessChange] = useState(false);

    const navigate = useNavigate();
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleShowRepeatPassword = () => {
        setShowRepeatPassword(!showRepeatPassword);
    }

    const handleClearPassword = () => {

    }

    const handleSubmit = () => {
        setSuccessChange(true);
    }


    const handleBack = () => {
        window.location.href = '/settings';
    }

    const renderModalChangePassword = () => {
        return (
            <>
                <div className="passChg__container">
                    <div className="passChg__mainContent">
                        <div className="passChg__mainIcon">
                            <img src={lockIcon} alt={"lock"} style={{height: "56px"}}/>
                        </div>

                        <span className="passChg__mainHeader">
                        Придумайте пароль
                    </span>

                        <span className="passChg__mainInfo">
                        Пароль должен состоять минимум из 8 символов и содержать цифры и специальные символы (! “ # $ % ‘ () *)
                    </span>

                        <div className="passChg__passwords">
                            <form className={s.input_container}>
                                <input type={showPassword ? "text" : "password"}
                                       className={s.textarea_password}
                                       value={password}
                                       placeholder={"Введите пароль"}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                {
                                    showError ? <img src={clearIcon} alt={"clear"} onClick={handleClearPassword}/> :
                                        <img src={hidePasswordIcon}
                                             alt="eye"
                                             className={s.show_password}
                                             onClick={toggleShowPassword}/>
                                }

                            </form>

                            <form className={s.input_container}>
                                <input type={showRepeatPassword ? "text" : "password"}
                                       className={s.textarea_password}
                                       value={repeatPass}
                                       placeholder={"Введите пароль повторно"}
                                       onChange={(e) => setRepeatPass(e.target.value)}/>

                                <img src={hidePasswordIcon}
                                     alt="eye"
                                     className={s.show_password}
                                     onClick={toggleShowRepeatPassword}/>
                            </form>
                        </div>
                    </div>

                    <div className="passChg__buttonContent">
                        <button className="passChg__buttonSave" onClick={handleSubmit}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </>
        )
    }

    const renderSuccessChanging = () => {
        return (
            <div className="success">
                <div className="success__icon">
                    <img src={successIcon} alt={"done"} style={{height: "56px"}}/>
                </div>

                <span className="success__header">
                    Пароль изменен
                </span>

                <button className="success__button" onClick={handleBack}>
                    Продолжить
                </button>
            </div>
        )
    }


    return (
        <Container fluid className="passChg">
            <div className="passChg__header">
                <button className="passChg__buttonBack" onClick={handleBack}>
                    <img src={backIcon} alt={"back"} style={{height: "24px"}}/>
                </button>
                <span>
                    Новый пароль
                </span>
            </div>

            {
                successChange ? renderSuccessChanging() : renderModalChangePassword()
            }
        </Container>
    )
}

export default PasswordChange;