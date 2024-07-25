import './App.scss';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import SideBar from "./Components/SideBar/SideBar";
import PersonalInfo from "./Pages/Operator/PersonalInfo/PersonalInfo";
import ChatMenu from "./Pages/Operator/Chats/ChatMenu";
import Settings from "./Pages/General/Settings/Settings";
import LogIn from './Pages/General/LogIn/LogIn';
import SignUp from './Pages/General/SignUp/SignUp';
import Logout from './Components/Logout';
import RecoveryPassword from './Components/RecoveryPassword/RecoveryPassword';
import StartPage from './Pages/General/Start/StartPage';

import Operators from "./Pages/Manager/Operators/Operators";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ManagerHomepageV2 from "./Pages/Manager/ManagerHomepage/ManagerHomepageV2";

import { setListOfClients } from './redux/chatReducer/chatActions';
import { useDispatch } from 'react-redux';

function App() {
    const dispatch = useDispatch();

    dispatch(setListOfClients());

    const ROLE_MANAGER = 'manager';
    const ROLE_OPERATOR = 'operator';

    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));

    const [showSidebar, setShowSidebar] = useState(localStorage.getItem('sidebar') === "null" ?
        localStorage.setItem('sidebar', "true") : localStorage.getItem('sidebar'));

    function handleLogin(token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    function handleSetShowSidebar() {
        if (showSidebar === 'false') {
            setShowSidebar('true');
            localStorage.setItem('sidebar', "true")
        } else {
            setShowSidebar('false');
            localStorage.setItem('sidebar', "false");
        }
    }


    return (
        <Container fluid className="content">
            <BrowserRouter>
                {isLoggedIn ? (
                    <Row>
                        <Col lg={showSidebar === 'false' ? 12 : 10} md={11} xs={12}
                            className="order-md-1 order-0 main__column">
                            <Routes>
                                {userRole === ROLE_OPERATOR ?
                                    <>
                                        <Route path='/' element={<PersonalInfo />} />
                                        <Route path='/home' element={<PersonalInfo />} />
                                        <Route path='/chats' element={<ChatMenu />} />
                                    </> : userRole === ROLE_MANAGER ?
                                        <>
                                            <Route path='/' element={<ManagerHomepageV2 />} />
                                            <Route path='/managerhomepage' element={<ManagerHomepageV2 />} />
                                            <Route path='/operators' element={<Operators />} />
                                            <Route path='/operator/:id' element={<PersonalInfo />} />
                                        </> : null}

                                <Route path='/settings/*' element={<Settings />} />
                                <Route path='/logout' element={<Logout />} />
                            </Routes>
                        </Col>
                        <Col lg={showSidebar === 'false' ? 0 : 2} md={1} xs={12} className="sidebar order-md-0 order-1">
                            <SideBar handleSetShowSidebar={handleSetShowSidebar} showSidebar={showSidebar} role={userRole} />
                        </Col>
                        {
                            showSidebar === 'false' ?
                                <button className={"expand__sidebar"} onClick={handleSetShowSidebar}> <MenuRoundedIcon /> </button> : null
                        }
                    </Row>
                ) : (
                    <Row>
                        <Routes>
                            <Route path='/' element={<StartPage />} />
                            <Route path='/start' element={<StartPage />} />
                            <Route path='/login' element={<LogIn onLogin={handleLogin} />} />
                            <Route path='/signup' element={<SignUp onSignup={handleLogin} />} />
                            <Route path='/passwordrecovery' element={<RecoveryPassword />} />
                        </Routes>
                    </Row>
                )}
            </BrowserRouter>
        </Container>
    );

}

export default App;
