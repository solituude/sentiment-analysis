import React from "react";
import { NavLink } from "react-router-dom";
import './startpage.scss';

const StartPage = () => {
    return(
        <div className="start_content">
            Привет :)
            <div className="buttons_container">
                <NavLink to='/signup'>
                    <button className="btn">
                        Зарегистрироваться
                    </button>
                </NavLink>
                 
                <NavLink to='/login'>
                    <button className="btn">
                        Войти
                    </button>
                </NavLink>
            </div>
            
        </div>
    );
}

export default StartPage;