import React from 'react';
import {Col, Row} from "react-bootstrap";
import s from '../managerhomepage.module.scss';
import departmentIcon from '../../../../assets/img/homepages/department.svg';
import {connect} from "react-redux";
import {requestUserInfo} from "../../../../redux/userInfoReducer/userInfoActions";

const ManagerHeader = ({name, phone, email}) => {

    return(
        <Row className="head_banner__container">
            {
             <><Col className="manager__card">
                    <div className="manager_name__card">
                        {name}
                    </div>
                    <div className="manager_phone__card">
                        {phone}
                    </div>
                    <div className="manager_phone__card">
                        {email}
                    </div>
                </Col>
                    <Col className={s.department__container}>
                        <div className={s.department}>
                            <img src={departmentIcon} alt={"depart"} style={{height: "28px"}}/>
                            Отдел технического обеспечения
                        </div>
                    </Col>
                </>
            }
        </Row>
    )
}

const mapStateToProps = (store) => ({
    name: store.userInfo.name,
    phone: store.userInfo.phone,
    email: store.userInfo.email,
});
export default connect(mapStateToProps, {requestUserInfo})(ManagerHeader);