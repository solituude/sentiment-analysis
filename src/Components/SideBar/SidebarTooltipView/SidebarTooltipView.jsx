import React from 'react';
import s from '../sidebar.module.scss';
import {NavLink} from "react-router-dom";
import {ThemeContext, themes} from "../../../contexts/ThemeContext";
import { useSpring, animated } from 'react-spring';


const SidebarTooltipView = ({sidebarItems, activeIndex, setShowTooltip}) => {
    const handleMouseLeave = () => {
        setShowTooltip(false);
    }

    const props = useSpring({
        from: { opacity: 1, transform: 'translateX(-100%)' },
        to: { opacity: 1, transform: 'translateX(0%)' },
        config: { duration: 150 },
    });


    return(
        <ThemeContext.Consumer>
            {({theme}) => (
                <>
                    <animated.div style={props} onMouseLeave={handleMouseLeave} className={s.mini__container}>
                        {
                            sidebarItems.map((item, index) => (
                                <NavLink to={item.to} key={index} onClick={() => setShowTooltip(false)}
                                         style={{textDecoration: "none"}}>
                                    <div className={activeIndex === index ? s.tab_active : s.tab_disable}>
                                        {theme === themes.light ? item.iconLightTheme : item.iconDarkTheme}
                                        {item.display}
                                    </div>
                                </NavLink>
                            ))
                        }
                    </animated.div>
                </>
            )}
        </ThemeContext.Consumer>
    )
}

export default SidebarTooltipView;