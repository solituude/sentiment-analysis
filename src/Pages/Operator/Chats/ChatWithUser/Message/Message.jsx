import React from 'react';

const Message = ({ message }) => {
    return (
        message.sender === "customer" ? (
            <div key={message.id} className="message__sender">
                <p className='message-sender'>{message.message}</p>
            </div>
        ) : message.sender === "system" ? (
            <div className="message__system">
                <p className='message-sender-system'>{message.message}</p>
            </div>
        ) : (
            <div className="message__recipient">
                <p className='message-sender'>{message.message}</p>
            </div>
        )
    );
}

export default React.memo(Message);
