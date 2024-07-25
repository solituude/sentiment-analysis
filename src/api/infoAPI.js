export const infoAPI = {
    // получение информации пользователя
    getPersonalInfo() {
        return fetch('/info/info/personalInfo/', {
            method: 'GET',
        })
    },

    // получение информации о конкретном опертаоре по айдишнику
    getPersonalOperatorInfo(id) {
        return fetch(`/info/personalOperatorInfo/${id}/`, {
            method: 'GET',
        })
    },
}