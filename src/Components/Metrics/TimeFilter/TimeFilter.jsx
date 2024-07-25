import React, {useState} from "react";
import s from '../../../Pages/Manager/ManagerHomepage/managerhomepage.module.scss';

const TimeFilter = ({ setActiveDate }) => {

    const [activeItem, setActiveItem] = useState(localStorage.getItem("activeDate") !== "null" ?
        localStorage.getItem("activeDate") : "dialogs"
    );

    const items = [
        {
            id: "dialogs",
            title: "Диалоги",
        },
        {
            id: "days",
            title: "Дни",
        },
        {
            id: "weeks",
            title: "Недели",
        },
        {
            id: "months",
            title: "Месяцы",
        },
        {
            id: "years",
            title: "Годы",
        },
    ]

    const handleClick = (newItem) => {
        setActiveItem(newItem);
        setActiveDate(newItem);
        localStorage.setItem('activeDate', newItem);
    }

    return (
        <div className={s.filters__chart}>
            {
                items.map((item) => (
                    <div className={item.id === activeItem ? s.tab_active : s.tab_disable}
                        onClick={() => handleClick(item.id)}
                        id={item.id} key={item.id}>
                        <span className={s.tab__text}>{item.title}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default TimeFilter;