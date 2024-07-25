import React from 'react';
import s from "../../Pages/Manager/ManagerHomepage/managerhomepage.module.scss";
import hideListIcon from "../../assets/img/homepages/hideList.svg";
import hideListDarkIcon from "../../assets/img/homepages/hideListDarkIcon.svg";
import dropdownIcon from "../../assets/img/homepages/dropdown.svg";
import {connect} from 'react-redux';
const DisplayButton = ({isCounterActive, setIsCounterActive, countDisplayedMetrics}) => {
    const theme = localStorage.getItem('theme');
    return(
        <div className={isCounterActive ? s.filters__contentactive : s.filters__contentnormal}
             onClick={() => setIsCounterActive(!isCounterActive)}>
            Отображение
            <div className={isCounterActive ? s.filters__counteractive : s.filters__counternormal}>
                {countDisplayedMetrics}
            </div>
            <img src={isCounterActive ? (theme === 'light' ? hideListIcon : hideListDarkIcon)
                : dropdownIcon} alt='down'/>
        </div>
    )
}

const mapStateToProps = (store) => ({
    countDisplayedMetrics: store.metrics.countDisplayedMetrics
})

export default connect(mapStateToProps)(DisplayButton);