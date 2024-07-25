import React, {useState} from "react";
import FormEmail from "./contentLogin/FormEmail";
import FromPassword from "./contentLogin/FormPassword";
import s from './login.module.css'
import { NavLink } from "react-router-dom";
import {connect} from "react-redux";
import {requestLogin} from "../../../redux/authReducer/authActions";

const LogIn = ({successfulLogin, requestLogin}) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const showError = !successfulLogin;


    const handleSubmit = async (e) => {
        e.preventDefault();
        requestLogin({email, password});
    }

    return (
        <div className={s.content}>
            <form className={s.main_block_auth} onSubmit={handleSubmit}>
                
                <span className={s.heading}>
                    Вход
                </span>

                <FormEmail setEmail={setEmail}  
                           showError={showError} 
                           valueEmail={email} />

                <FromPassword setPassword={setPassword} 
                              showError={showError} 
                              valuePassword={password} />

                <div className={s.password_recovery_link}>
                    <NavLink to='/passwordrecovery' style={{textDecoration:"none", color: "#2D81E0"}}>
                        Не помню пароль
                    </NavLink>
                </div>
                

                <div className={s.container_checkbox}>
                    <input type="checkbox" className={s.custom_checkbox} id='remember'/>
                    <label htmlFor='remember'>
                        Запомнить меня
                    </label>
                </div>

                <div className={s.buttons_container} >
                    <button className={s.btn_entrance} type="submit">
                        Войти
                    </button>

                    <NavLink to='/signup' className={s.btn_signup}>
                        Зарегистрироваться
                    </NavLink>
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (store) => ({
    successfulLogin: store.customAuth.successfulLogin,
})

export default connect(mapStateToProps,{requestLogin})(LogIn);