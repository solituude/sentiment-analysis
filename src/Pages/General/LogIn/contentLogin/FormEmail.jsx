import React from "react";
import s from './form.module.css';


const FormEmail = (props) => {
    return (
        <div className={s.form}>
            <label className={s.subhead}>Почта</label>
            
            <input className={s.textarea_email}
                   name="email"
                   value={props.valueEmail} 
                   onChange={(e) => props.setEmail(e.target.value)} required/>

            {props.showError ?
                <div className={s.caption_error}> 
                    Аккаунта с такой почтой не существует
                </div> : null
            }
        </div>
    )
}

export default FormEmail;