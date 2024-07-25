// Logout.jsx
import React, { useEffect } from 'react';

const Logout = () => {

    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    useEffect(() => {
        const logout = async () => {
            // await axios.post('/customauth/customauth/logout/');
            const csrftoken = getCookie('csrftoken');
            const headers = { 'X-CSRFToken': csrftoken };
            let resp = await fetch("/customauth/customauth/logout/", {
                method: "POST",
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: ''
            })
            let dat = await resp.json();
            console.log("RES logout", dat);
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('phone');
            localStorage.removeItem('role');
            window.location.href = '/login';
        };

        logout();
    }, []);

    return (
        <p>Logging out...</p>
    );
};

export default Logout;
