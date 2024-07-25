import React from 'react';

const RenderUsers = ({ user, onUserSelect, index }) => {
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
        <div onClick={() => onUserSelect(user)} className="user__element" key={index}>
            <div className="user__icon" style={{ backgroundColor: 'grey' }}>
                <span className="initials">{initials}</span>
            </div>
            <div className="user__content">
                <div className="user__name"><p className='user__name__text'>{user_name_surname}</p></div>
                <div className="user__tonality">Тональность: <span style={{ color: 'var(--color-text-general)' }}>{Math.round(user.customer_sentiment * 100)}%</span></div>
            </div >
            <div className="user__activity">Сегодня</div>
        </div >
    );
};

export default RenderUsers;