import React from "react";
import sendIcon from '../../../../../assets/img/chats/send-icon.svg';
import '../Chat.css';

const Input = ({ message, setMessage, sendMessage, onKeyDown }) => {

    return (
        <div className='container3'>
            <input
                placeholder='Напишите сообщение...'
                onChange={(e) => { setMessage(e.target.value) }}
                value={message}
                onKeyDown={onKeyDown}
                type="text"
                class="form__field"
            />
            
            <div onClick={(event) => sendMessage(event)} className='btn-theme'>
                <img src={sendIcon} alt="send-down"></img>
            </div>
        </div>
    )
}

export default Input;