import React from "react";
import '../Chat.css';

const Header = ({ customer, closeChat, dialogStatus, clientID }) => {

    return (
        <div className='user__info'>
            <div className="user__icon2"></div>
            <div className='infoo'>
                <div><p className='user__name'>{customer.name} {customer.surname}</p></div>
                <div className="user__tonality">Тональность: {customer.customer_sentiment}</div>
            </div>
            <div className="close__appeal">
                <div className={dialogStatus ? "wrapper__appeal" : "wrapper__appeal__close"} onClick={() => closeChat(clientID)}>
                    <span className="close__appeal__text">Закрыть обращение</span>
                </div>
            </div>
        </div>
    )

}

export default Header;