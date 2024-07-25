import React from "react";
import s from './operators.module.scss';
import avaTestIcon from './avaTest.svg';
import lockIcon from '../../../assets/img/settings/lock.svg';
import unlockIcon from '../../../assets/img/metrics/unlock.svg';
import moreIcon from '../../../assets/img/homepages/more.svg';
import { NavLink } from "react-router-dom";

const RenderOperator = ({ operator, toggleBlockOperator }) => {
    return (
        <tr className={operator.isBlock ? s.table_lock : s.table_tr}>
            <td className={s.table__td} style={{ gap: "12px", height: "75.5px", alignItems: "center", padding: "0 16px !important", flexDirection: "row" }}>
                <img src={avaTestIcon}  alt={"ava"} style={{ height: "40px", display: "inline-block", verticalAlign: "middle" }}/>
                <span style={{ marginLeft: "15px" }}>{operator.sur_name + " " + operator.name}</span>
            </td>
            <td className={s.table__td}><span style={{ display: "inline-block", verticalAlign: "middle" }}>{operator.email}</span></td>
            <td className={s.table__td}>
                <button className={s.lock} onClick={() => toggleBlockOperator(operator.id)} style={{ marginLeft: "auto" }}>

                    {
                        operator.isBlock ? (
                            <> <img src={unlockIcon} alt={"unlock"} style={{ height: "25px", display: "inline-block", verticalAlign: "middle" }} />
                                <span style={{ marginLeft: "15px" }}>Разблокировать</span>
                            </>
                        ) : (<> <img src={lockIcon} alt={"lock"} style={{ height: "25px", display: "inline-block", verticalAlign: "middle" }} />
                            <span style={{ marginLeft: "15px" }}>Заблокировать</span>
                        </>)
                    }
                </button>
            </td>

            <td className={s.table__td}>
                <NavLink to={`/operator/${operator.id}`}>
                    <button className={s.btn}>
                        <img src={moreIcon} alt={"more"} style={{ height: "24px" }} />
                    </button>
                </NavLink>
            </td>
        </tr>
    );
}

export default RenderOperator;