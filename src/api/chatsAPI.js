export const chatsAPI = {
    // роль: ОПЕРАТОР
    // список сообщений с пользователем
    getMessage(id) {
        return fetch(`/chats/${id}/`, {
            method: 'GET',
        })
    },

    // роль: ОПЕРАТОР
    // список сообщений с пользователем
    postMessage(data, id) {
        return fetch(`/chats/${id}`, {
            method: 'POST',
            body: data
        })
    },

    // роль: ОПЕРАТОР
    // информация о клиенте
    getCustomer(id) {
        return fetch(`/chats/customer/${id}`, {
            method: 'GET',
        })
    },

    getListOfClients() {
        return fetch('/chats/chats/', {
            method: 'GET',
        })
    },

    postMessageFromTG(data) {
        return fetch('/messageFromTg/', {
            method: 'POST',
            body: data
        })
    },

    // роль: ОПЕРАТОР
    getChats() {
        return fetch('/chats/', {
            method: 'GET',
        })
    },

    getSentiment(id) {
        return fetch(`/chats/getSentiment/${id}/`, {
            method: 'GET',
        })
    },

    getCustomerSentimentMean(id) {
        return fetch(`/chats/getSentimentMean/${id}/`, {
            method: 'GET',
        })
    },

    getDialogsInfo() {
        return fetch(`/chats/dialogs/getInfo/`, {
            method: 'GET',
        })
    },

    // роль: ОПЕРАТОР
    // проверка закрытия диалога
    getCloseDialog(id) {
        return fetch(`/chats/dialogs/checkCloseDialog/${id}/`, {
            method: 'GET',
        })
    },

    //роль: ОПЕРАТОР
    // закрывает диалог
    updateCloseDialog(id, headers) {
        return fetch(`chats/dialogs/checkCloseDialog/${id}/`, {
            method: "POST",
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: ''
        })
    },

    getOperatorsForManager() {
        return fetch('/managerInfo/getOperators/', {
            method: 'GET',
        })
    }

}