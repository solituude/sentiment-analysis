import React, { useEffect, useState } from "react";
// import Table from 'react-bootstrap/Table';
import s from './operators.module.scss';
// import { MenuItem, PaginationItem, Select } from "@mui/material";
// import avaTestIcon from './avaTest.svg';
import { Container } from "react-bootstrap";
// import showPasswordIcon from '../../../assets/img/showPassword.svg';
// import lockIcon from '../../../assets/img/lock.svg';
// import unlockIcon from '../../../assets/img/unlock.svg';
// import moreIcon from '../../../assets/img/more.svg';
import filterIcon from '../../../assets/img/homepages/filter.svg';
import searchIcon from '../../../assets/img/chats/search.svg';
// import Pagination from "@mui/material/Pagination";
//
// import leftIcon from '../../../assets/img/left.svg';
// import rightIcon from '../../../assets/img/right.svg';
// import { NavLink } from "react-router-dom";
import CustomTable from "./CustomTable/CustomTable";
import RenderOperator from "./RenderOperator";

const Operators = () => {

    const [operators, setOperators] = useState([]);
    const [visibleOperators, setVisibleOperators] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        getOperators()
    }, [])

    let getOperators = async () => {
        let response = await fetch('chats/managersInfo/getOperators/');
        let data = await response.json();
        console.log(data)
        setOperators(data)
        setFilteredUsers(data)
    }

    const [tableData, setTableData] = useState(operators.map((item) => {
        return { ...item, showPassword: false, isBlock: false }
    }));

    const togglePasswordVisibility = (id) => {
        setTableData((prevData) => {
            return prevData.map((item) => {
                if (item.id === id) {
                    console.log(!item.showPassword)
                    return { ...item, showPassword: !item.showPassword };
                }
                return item;
            });
        });
    };

    const toggleBlockOperator = (id) => {
        setTableData((prevData) => {
            return prevData.map((item) => {
                if (item.id === id) {
                    return { ...item, isBlock: !item.isBlock };
                }
                return item;
            });
        });
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredUsers = operators.filter((user) => {
            const fullName = `${user.name} ${user.surname}`;
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredUsers(filteredUsers);
    };

    const showMoreOperators = () => {
        setVisibleOperators(visibleOperators + 3);
    };

    console.log(operators.length, visibleOperators)

    return (

        <Container>
            <div className={s.table__container}>
                <div className={s.table__header}>
                    <p className={s.table_h}>
                        Операторы
                    </p>

                    <div className={s.table_filters}>
                        <div className={s.table__search}>
                            <img src={searchIcon} alt={"search"} style={{ height: "24px" }} />
                            <input
                                className={s.table__input}
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                <CustomTable className={s.table}>
                    <thead>
                        <tr>
                            <td>
                                <div className={s.table_list}>
                                    Имя
                                    <button className={s.btn}>
                                        <img src={filterIcon} alt={"filter"} />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className={s.table_list}>
                                    Логин
                                    <button className={s.btn}>
                                        <img src={filterIcon} alt={"filter"} />
                                    </button>
                                </div>
                            </td>
                            <td colSpan={2}></td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredUsers.slice(0, visibleOperators).map((operator, key) => (
                                <RenderOperator operator={operator} toggleBlockOperator={toggleBlockOperator} key={key} />
                            ))
                        }


                    </tbody>
                </CustomTable>

                <div className={s.table__footer}>
                    {
                        operators.length === visibleOperators || operators.length < visibleOperators ? null : (
                            <div className={s.button_scroll_down} onClick={showMoreOperators}>
                                Показать еще
                            </div>
                        )
                    }
                </div>

            </div>
        </Container>

    )
}

export default Operators;