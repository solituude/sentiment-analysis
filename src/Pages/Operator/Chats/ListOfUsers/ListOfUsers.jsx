import React, { useState, useEffect } from 'react';
import './List.css';
import RenderUsers from './RenderUsers/RenderUsers';

import { chatsAPI } from '../../../../api/chatsAPI'

const ListOfUsers = ({ onUserSelect }) => {
    const [users, setUsers] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredUsers = users.filter((user) => {
            const fullName = `${user.name} ${user.surname}`;
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredUsers(filteredUsers);
    };

    const getUsers = async () => {
        const response = await chatsAPI.getListOfClients();
        let data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
    }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <div className="chats_content" style={{ maxWidth: 300 + 'px' }}>
            <input
                className='input__search'
                placeholder='Найти'
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="users__container">
                {filteredUsers.map((user, index) => (
                    <RenderUsers user={user} onUserSelect={onUserSelect} key={index} />
                ))}
            </div>
        </div>
    );
};

export default ListOfUsers;