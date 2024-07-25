import React, { useState, useEffect } from 'react';
import Messages from './Messages/Messages'
import './Chat.css';
import Input from './Input/Input';
import Header from './Header/Header';
import { connect } from 'react-redux';
import { setClientId, updateCloseDialog, resetChatState, connectWebSocket } from '../../../../redux/chatReducer/chatActions'

const ChatWithUser = ({ selectedUser, clientID, socket, dialogStatus, messages, clientInfo, setClientId, updateCloseDialog, resetChatState, connectWebSocket }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (selectedUser !== null && selectedUser !== clientID) {
            setClientId(selectedUser);
        }
    }, [selectedUser, clientID]);

    useEffect(() => {
        if (clientID) {
            const newSocket = connectWebSocket(clientID);
            return () => {
                newSocket.close();
                resetChatState();
            };
        }
    }, [clientID]);

    const sendMessage = () => {
        if (message.trim() !== '' && dialogStatus) {
            const data = {
                message: message,
                sender: 'operator',
            };
            socket.send(JSON.stringify(data));
            setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') sendMessage();
    };

    return (
        <div className="main__info col">
            {clientID ? (
                <div>
                    <Header customer={clientInfo} closeChat={updateCloseDialog} dialogStatus={dialogStatus} clientID={clientID} />
                    <Messages messages={messages} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} onKeyDown={handleKeyPress} />
                </div>
            ) : (
                <div className='empty__chat'>
                    <span className='empty__text'>Выберите, кому хотели бы написать</span>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (store) => ({
    clientID: store.chat.clientID,
    socket: store.chat.socket,
    dialogStatus: store.chat.dialogStatus,
    messages: store.chat.messages,
    clientInfo: store.chat.clientInfo,
});

export default connect(mapStateToProps, { setClientId, updateCloseDialog, resetChatState, connectWebSocket })(ChatWithUser);
