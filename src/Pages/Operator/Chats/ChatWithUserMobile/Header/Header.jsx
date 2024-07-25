import React from "react";
import '../Chat_mobile.css';
import iconBack from '../../../../../assets/img/chats/chatMobileBack.svg'

const Header = ({ customer, closeChat, dialogStatus, closeChatMobile }) => {

    return (
        <div className='user__info__mobile'>
            <div><img src={iconBack} style={{width: "40px", height: "40px", cursor: "pointer"}} onClick={() => closeChatMobile()}/></div>
            <div className="user__icon2"></div>
            <div className='infoo'>
                <div><p className='user__name'>{customer.name} {customer.surname}</p></div>
                <div className="user__tonality">Тональность: {customer.customer_sentiment}</div>
            </div>
            <div className="close__appeal">
                <div className={dialogStatus ? "wrapper__appeal" : "wrapper__appeal__close"} onClick={() => closeChat()}>
                    <span className="close__appeal__text">Закрыть обращение</span>
                </div>
            </div>
        </div>
    )

}

export default Header;