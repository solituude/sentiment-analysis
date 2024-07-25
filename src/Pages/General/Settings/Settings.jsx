import React, {useEffect, useState} from "react";

import s from './settings.module.scss';
import {Col, Row} from "react-bootstrap";

import safeIcon from '../../../assets/img/settings/safe.svg';
import metricsIcon from '../../../assets/img/settings/metrics.svg';
import SecuritySection from "./SecuritySection/SecuritySection";
import {NavLink, Route, Routes, useLocation} from "react-router-dom";
import MetricsSection from "./MetricsSection/MetricsSection";

const Settings = () => {
    const [activeSection, setActiveSection] = useState(0);
    const location = useLocation();

    const navbarItems = [
        {
            id: 0,
            name: 'security',
            title: 'Безопасность и вход',
            image: safeIcon,
            header: 'Безопасность и вход'
        },
        {
            id: 1,
            name: 'metrics',
            title: 'Метрики',
            image: metricsIcon,
            header: 'Метрики'
        }
    ]

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2];
        const activeItem = navbarItems.findIndex(item => curPath?.includes(item.name));
        setActiveSection(curPath === undefined ? 0 : activeItem);
    }, [location])
    return (
        <Row className={s.settingsContent} >
            <Row className={s.settingsContent__header}>
                {navbarItems[activeSection].header}
            </Row>
            <Row xs={12}>
                <Col sx={8} className={s.settingsContent__col}>
                    <Routes>
                        <Route path='' element={<SecuritySection />}/>
                        <Route path='security' element={<SecuritySection />}/>
                        <Route path='metrics' element={<MetricsSection/>}/>
                    </Routes>
                </Col>
                <Col xs={4} className={s.nav__container}>
                    {
                        navbarItems.map((item) => (
                            <NavLink to={item.name} key={item.id}>
                                <div className={activeSection === item.id ? s.settingsContent__infoCard_active :
                                    s.settingsContent__infoCard_disable}>
                                    <img src={item.image} alt={"s"} className={s.settingsContent__icon}/>
                                    {item.title}
                                </div>
                            </NavLink>
                        ))
                    }
                </Col>
            </Row>
        </Row>
    );
}

export default Settings;