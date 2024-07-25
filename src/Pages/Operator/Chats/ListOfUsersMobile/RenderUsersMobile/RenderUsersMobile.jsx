import React from 'react';
import '../ListModile.css';

const RenderUsersMobile = ({ user, index, onUserSelect }) => {
    let initials = "NN";
    let user_name_surname = "Name";

    if (user.telegram_username == null || user.surname == null) {
        initials = user.name.charAt(0);
        user_name_surname = user.name;
    } else {
        initials = user.name.charAt(0) + user.surname.charAt(0);
        user_name_surname = user.name + " " + user.surname;

    }

    return (
        <div onClick={() => onUserSelect(user)} key={index}>
            <div className="user__element__mobile">
                <div className="user__icon" style={{ backgroundColor: 'grey' }}>
                    <span className="initials">{initials}</span>
                </div>
                <div className="user__content">
                    <div className="user__name"><p className='user__name__text'>{user_name_surname}</p></div>
                    <div className="user__tonality">Тональность: <span style={{ color: 'var(--color-text-general)' }}>{Math.round(user.customer_sentiment * 100)}%</span></div>
                </div >
                <div className="user__activity">Сегодня</div>
            </div >
        </div >
    );
};

export default RenderUsersMobile;