import React from 'react';
import Table from 'react-bootstrap/Table';
import s from '../operators.module.scss';

const CustomTable = ({ children }) => {
    return (
        <div className={s.table__responsive}>
            <Table responsive>
                {children}
            </Table>

        </div>
    );
};

export default CustomTable;