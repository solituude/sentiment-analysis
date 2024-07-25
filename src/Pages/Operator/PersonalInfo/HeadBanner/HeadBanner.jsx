import React from "react";
import './headbanner.scss'
import BossCard from "./BossCard";
import {Col, Row} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import backIcon from '../../../../assets/img/homepages/back.svg';

const HeadBanner = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const [ID, setID] = useState(null);

    useEffect(() => {
        const currID = location.pathname.match(/\d+/);
        setID(currID);
        if (currID !== null) {
            getCurrOperator(currID);
        } else {
            getUser();
        }
    }, []);

    let getUser = async () => {
        let response = await fetch('/info/info/personalInfo/');
        let data = await response.json();
        setUser(data);
        console.log(data);
    }


    const getCurrOperator = async (ID) => {
        const response = await fetch(`/info/info/personalOperatorInfo/${ID}/`);
        const data = response.json();
        data.then(res => {
            setUser(res);
            console.log(res);
        })
    }

    const handleReturnBack = () => {
        navigate(-1);
    }

    return (
        <Row className="head_banner__container">
            <Col className="manager__card">
                {ID ?
                    <img src={backIcon} className="back__button" alt={'<-'} onClick={handleReturnBack}/>

                        : null}
                <div className="manager_name__card">
                    {user.name} {user.patronymic} {user.sur_name}
                </div>

                <div className="manager_phone__card">
                    {user.phone_number}
                </div>

                <div className="manager_phone__card">
                    {user.email}
                </div>

            </Col>
            <Col xxl={6} md={7} xs={12}>
                <BossCard/>
            </Col>
        </Row>
    );
}

export default HeadBanner;