function getCookie(name) {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
const csrftoken = getCookie('csrftoken');
const headers = { 'X-CSRFToken': csrftoken };
export const customauthAPI = {
    signUp(data) {
        return fetch('/customauth/customauth/signup/', {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: data,
        })
    },

    logIn(data) {
        // return axios.post('/customauth/customauth/login/', data)
        return fetch('/customauth/customauth/login/', {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    },

    logOut(data) {
        return fetch('/customauth/customauth/logout/', {
            method: 'POST',
            body: data,
        })
    },

    getRole() {
        return fetch('/customauth/customauth/role/', {
            method: 'GET',
        })
    }
}