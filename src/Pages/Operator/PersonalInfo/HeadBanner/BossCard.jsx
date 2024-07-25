import React from "react";
import './headbanner.scss';
import mailIcon from '../../../../assets/img/chats/mail.svg';
import whatsAppIcon from '../../../../assets/img/homepages/whatsApp.svg'
import {Col, Row} from "react-bootstrap";
import {useState, useEffect} from 'react'


const BossCard = () => {   
    return (
        <Row className="boss__card">
            <Col>
                <div className="boss_name__card">
                    Александра Степановна Максимов
                    <div className="job__title">
                        Руководитель
                    </div>
                </div>
            </Col>

            <Col>
                <div className="contacts__card">
                    <div className="info__cell">
                        <div className="icon">
                            <img src={mailIcon} alt="mail"/>
                        </div>
                        itsmeуууууууууу@mail.com
                    </div>
                    <div className="info__cell">
                        <div className="icon">
                            <img src={whatsAppIcon} alt="whatsapp"/>
                        </div>
                        WhatsApp
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default BossCard;
