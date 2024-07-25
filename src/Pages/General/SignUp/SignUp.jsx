import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from './signup.module.scss';
import hidePasswordIcon from '../../../assets/img/settings/hidePassword.svg'
import axios from 'axios';

const SignUp = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/customauth/customauth/signup/', { email, password });
            window.location.href = '/login';
        } catch(error) {
            setError(true);
        }
    }

    return (
        <div className={s.content}>
            <form className={s.main_block} onSubmit={handleSubmit}>
                <p className={s.heading}>
                    Регистрация
                </p>

                <label className={s.form_item}>
                    Почта
                    <input className={s.textarea_email} 
                           value={email}
                           type="email"
                           onChange={(e) => setEmail(e.target.value)}/>
                    {error ? 
                    <div className={s.caption_error}>
                        Аккаунт с такой почтой уже существует
                    </div> : null}
                </label>

                

                <label className={s.form_item}>
                    Пароль
                    <div className={s.input_container}>
                        <input type={showPassword ? "text" : "password"} 
                            className={s.textarea_password} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>

                        <img src={hidePasswordIcon} 
                            alt="eye"
                            className={s.show_password}
                            onClick={toggleShowPassword}/>
                    </div>
                </label>


                <button className={s.btn_signup} type="submit">
                    Зарегистрироваться
                </button>

                <p className={s.signin_container}>
                    У вас есть профиль? 
                    <NavLink to='/login'className={s.signin_link}> Войдите</NavLink>
                </p>


            </form>
        </div>
    )
};

export default SignUp;