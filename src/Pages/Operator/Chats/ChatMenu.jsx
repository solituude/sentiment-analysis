import React, { useEffect, useState } from 'react';
import ListOfUsers from './ListOfUsers/ListOfUsers';
import ListOfUsersMobile from './ListOfUsersMobile/ListOfUsersMobile';
import ChatWithUser from './ChatWithUser/ChatWithUser';
import ChatWithUserMobile from './ChatWithUserMobile/ChatWithUserMobile';
import { useResize } from './use-resize';
import { setClientId, requestChatInfo, requestCheckCloseDialog, requestListOfClients } from '../../../redux/chatReducer/chatActions';
import { connect } from 'react-redux';

const ChatMenu = (props) => {
    const { isScreemSmm, isScreenSm, isScreenMd } = useResize();
    const [id, setId] = useState(null);
    const [showMobileList, setShowMobileList] = useState(true);

    // useEffect(() => {

    // }, [])
    // props.requestListOfClients();

    const handleUserSelect = user => {
        setId(user.id)
        props.setClientId(user.id);
        props.requestCheckCloseDialog(user.id);
        props.requestChatInfo(user.id);

        // if (isScreenSm && !isScreenMd) {
        //     setShowMobileList(prevShowMobileList => !prevShowMobileList);
        //     setId(user.id);
        // } else {
        //     setId(user.id);
        //     setShowMobileList(false);
        // }
    };

    // const closeChatMobile = () => {
    //     setId(null);
    //     setShowMobileList(true);
    // }

    return (
        <>
            {/* {isScreemSmm && !isScreenMd ? (
                showMobileList ? (
                    <ListOfUsersMobile onUserSelect={handleUserSelect} />
                ) : (
                    <ChatWithUserMobile selectedUser={id} closeChatMobile={closeChatMobile} />
                )
            ) : ( */}
            <div className="row">
                <ListOfUsers onUserSelect={handleUserSelect} />
                <ChatWithUser selectedUser={id} />
            </div>
            {/* )} */}
        </>
    );
};

const mapStateToProps = (store) => ({
    clientID: store.chat.clientID,
});

export default connect(mapStateToProps, { setClientId, requestChatInfo, requestCheckCloseDialog, requestListOfClients })(ChatMenu); 