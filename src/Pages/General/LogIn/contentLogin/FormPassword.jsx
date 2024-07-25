import React from "react";
import { useState } from "react";
import hidePasswordIcon from '../../../../assets/img/settings/hidePassword.svg'
import s from './form.module.css';

const FromPassword = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // };

    return (
        <div className={s.form}> 
            <label className={s.subhead}>Пароль</label>
            
            <div className={s.input_container}>
                <input type={showPassword ? "text" : "password"} 
                       className={s.textarea_password}
                       name="password"
                       value={props.valuePassword}
                       onChange={(e) => props.setPassword(e.target.value)}/>

                <img src={hidePasswordIcon} 
                    alt="eye"
                    className={s.show_password}
                    onClick={toggleShowPassword}/>
            </div>

            {props.showError ?
                <p className={s.caption_error}> 
                    Неверный пароль
                </p> : null
            }
        </div>
    )
}

export default FromPassword;