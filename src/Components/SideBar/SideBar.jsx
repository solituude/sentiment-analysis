import s from './sidebar.module.scss';

import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ThemeContext, themes} from "../../contexts/ThemeContext";
import {useLocation} from 'react-router-dom';
import Switch from '@mui/material/Switch';

import personalIconLight from '../../assets/img/homepages/personalIcon.svg';
import personalIconDark from '../../assets/img/homepages/personalIconDark.svg';
import chatsIconLight from '../../assets/img/chats/chats.svg';
import chatsIconDark from '../../assets/img/chats/chatsIconDark.svg';
import settingsIconLight from '../../assets/img/homepages/settings.svg';
import settingsIconDark from '../../assets/img/homepages/settingsIconDark.svg';
import ToggleThemeButtonDark from '../../assets/img/homepages/toggleTheme.svg';
import ToggleThemeButtonLight from '../../assets/img/homepages/toggleThemeLight.svg';
import managerHomepageIcon from '../../assets/img/homepages/managerHomepage.svg';
import managerHomepageDarkIcon from '../../assets/img/homepages/managerHomepageDark.svg';
import operatorsIcon from '../../assets/img/homepages/operatorsIcon.svg';
import operatorsDarkIcon from '../../assets/img/homepages/operatorsDarkIcon.svg';
import SidebarTooltipView from "./SidebarTooltipView/SidebarTooltipView";
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

const ROLE_MANAGER = 'manager';
const ROLE_OPERATOR = 'operator';

const sidebarItemsOperator = [
    {
        display: 'Личные данные',
        iconLightTheme: <img src={personalIconLight} alt='personal icon'/>,
        iconDarkTheme: <img src={personalIconDark} alt='personal icon'/>,
        to: '/home',
        section: 'home'
    },

    {
        display: 'Чаты',
        iconLightTheme: <img src={chatsIconLight} alt='chats icon'/>,
        iconDarkTheme: <img src={chatsIconDark} alt='chats icon'/>,
        to: '/chats',
        section: 'chat'
    },

    {
        display: 'Настройки',
        iconLightTheme: <img src={settingsIconLight} alt='settings icon'/>,
        iconDarkTheme: <img src={settingsIconDark} alt='settings icon'/>,
        to: '/settings',
        section: 'settings'
    }
];

const sidebarItemsManager = [
    {
        display: 'Главная',
        iconLightTheme: <img src={managerHomepageIcon} alt='homepage icon'/>,
        iconDarkTheme: <img src={managerHomepageDarkIcon} alt='personal icon'/>,
        to: '/managerhomepage',
        section: 'managerhomepage'
    },
    {
        display: 'Операторы',
        iconLightTheme: <img src={operatorsIcon} alt='operator icon'/>,
        iconDarkTheme: <img src={operatorsDarkIcon} alt='personal icon'/>,
        to: '/operators',
        section: 'operator'
    },
    {
        display: 'Настройки',
        iconLightTheme: <img src={settingsIconLight} alt='settings icon'/>,
        iconDarkTheme: <img src={settingsIconDark} alt='settings icon'/>,
        to: '/settings',
        section: 'settings'
    }
];

const sidebarItemsOther = [
    {
        display: 'Настройки',
        iconLightTheme: <img src={settingsIconLight} alt='settings icon'/>,
        iconDarkTheme: <img src={settingsIconDark} alt='settings icon'/>,
        to: '/settings',
        section: 'settings'
    }
]

const SideBar = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [showTooltip, setShowTooltip] = useState(false);
    const location = useLocation();
    const [sidebarItems, setSidebarItems] = useState(() => (
            props.role === ROLE_OPERATOR ? sidebarItemsOperator :
                props.role === ROLE_MANAGER ? sidebarItemsManager :
                    sidebarItemsOther
        ));


    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarItems.findIndex(item => curPath.includes(item.section));
        // const activeItem = sidebarItems.findIndex(item => curPath === item.section);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const threshold =  5;

            if (mouseX <= threshold) {
                setShowTooltip(true);
            } else if (mouseY < 190 || mouseY > 360) {
                setShowTooltip(false);
            }
        };

        if (!showTooltip) {
            document.addEventListener('mousemove', handleMouseMove);
        }
    }, []);


    return (
        <ThemeContext.Consumer>
            {({theme, setTheme}) => (
                <>
                    <div className={`${s.container} ${props.showSidebar === 'false' ? s.container_hide : ''}`}>
                        <div className={`${s.content}` }>
                            <button onClick={props.handleSetShowSidebar}
                                    className={s.hide__button}><KeyboardDoubleArrowLeftRoundedIcon/></button>
                            {
                                sidebarItems.map((item, index) => (
                                    <NavLink to={item.to} key={index} style={{textDecoration: "none"}}>
                                        <div className={activeIndex === index ? s.tab_active : s.tab_disable}>
                                            {theme === themes.light ? item.iconLightTheme : item.iconDarkTheme}
                                            {item.display}
                                        </div>
                                    </NavLink>
                                ))
                            }
                        </div>

                        <div className={s.toggle__theme}>
                            <img src={theme === themes.light ? ToggleThemeButtonLight : ToggleThemeButtonDark} alt={"btn"}/>
                            <span>
                            Тёмная тема
                        </span>
                            <Switch checked={theme === themes.dark} onChange={() => {
                                if (theme === themes.light) setTheme(themes.dark)
                                if (theme === themes.dark) setTheme(themes.light)
                            }}/>
                        </div>
                    </div>

                    {
                        showTooltip && props.showSidebar === 'false' ? <SidebarTooltipView
                            activeIndex={activeIndex}
                            setShowTooltip={setShowTooltip}
                            sidebarItems={sidebarItems}
                            /> : null
                    }
                </>

            )}
        </ThemeContext.Consumer>
    );
}

export default SideBar;