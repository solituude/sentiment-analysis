import React, { useState, useEffect } from 'react';
import Messages from './Messages/Messages'
import './Chat_mobile.css';
import Input from './Input/Input';
import Header from './Header/Header'

const ChatWithUserMobile = ( {selectedUser, closeChatMobile} ) => {
    const [customerId, setCustomerId] = useState();
    const [socket, setSocket] = useState(null);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [customer, setCustomer] = useState('');
    const [isNumber, setIsNumber] = useState(false);

    const [dialogStatus, setDialogStatus] = useState(false)

    useEffect(() => {
        if (selectedUser != null) {
            setCustomerId(selectedUser);
            setIsNumber(true)
            getStatusDialog(selectedUser);
        } else {
            setIsNumber(false)
        }

    }, [selectedUser]);



    useEffect(() => {
        if (isNumber) { // получили ли id клиента
            getInfoCustomer();
            getSentimentMean();

            const newSocket = new WebSocket('ws://127.0.0.1:8000/ws/' + customerId + '/');
            setSocket(newSocket);

            newSocket.onopen = () => {
                console.log('WebSocket Client Connected', customerId)
            };

            newSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data]);
                setDialogStatus(true)
            };

            return () => {
                setMessages([]);
                newSocket.close();
            };
        }


    }, [customerId]);

    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    let getInfoCustomer = async () => {
        let respCus = await fetch('/chats/customer/' + customerId)
        let dataCus = await respCus.json()
        setCustomer(dataCus)
    }

    let getSentimentMean = async () => {
        let resp = await fetch('/chats/customer/getSentimentMean/' + customerId);
    }

    let getStatusDialog = async (selectedUser) => {
        // console.log('chats/dialogs/checkCloseDialog/' + selectedUser)
        let resp = await fetch('chats/dialogs/checkCloseDialog/' + selectedUser)
        let data = await resp.json()
        setDialogStatus(data.active)
    }


    const sendMessage = () => {
        if (message.trim() !== '') {
            if (dialogStatus) {
                
                const data = {
                    message: message,
                    sender: 'operator',
                };

                socket.send(JSON.stringify(data));
                setMessage('');
            }
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const closeChat = async () => {
        const csrftoken = getCookie('csrftoken');
        const headers = { 'X-CSRFToken': csrftoken };
        let resp = await fetch(`chats/dialogs/checkCloseDialog/${customerId}/`, {
            method: "POST",
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: ''
        })
        setDialogStatus(false)
    };

    return (
        <div className="main__info__mobile col">
            {isNumber ? (
                <div>
                    <Header customer={customer} closeChat={closeChat} dialogStatus={dialogStatus} closeChatMobile={closeChatMobile} />
                    <Messages messages={messages} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} onKeyDown={handleKeyPress} />
                </div>
            ) : (

                <div className='empty__chat'>
                    <span className='empty__text'>Выберите, кому хотели бы написать</span>
                </div>
            )
            }

        </div>
    )
}

export default ChatWithUserMobile;