import React, { useState, useEffect } from 'react';
import './ListModile.css';
import RenderUsersMobile from './RenderUsersMobile/RenderUsersMobile';

const ListOfUsersMobile = ( {onUserSelect} ) => {
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

    let getUsers = async () => {
        let response = await fetch('/chats/chats/')
        let data = await response.json()
        localStorage.setItem('data', data)
        setUsers(data)
        setFilteredUsers(data)
    }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <div className="chats_content__mobile" style={{ width: "100%" }}>
            <input
                className='input__search'
                placeholder='Найти'
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="users__container__mobile">
                {filteredUsers.map((user, index) => (
                    <RenderUsersMobile user={user} onUserSelect={onUserSelect} key={index} />
                ))}
            </div>
        </div>
    );
};

export default ListOfUsersMobile;