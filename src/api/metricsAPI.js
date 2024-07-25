export const metricsAPI = {
    getCountOfDialogs() {
        return fetch('/metrics/dialogs/count/', {
            method: 'GET',
        })
    },

    getAvgProcessingTime() {
        return fetch('/metrics/dialogs/avgProcessingTime/', {
            method: 'GET'
        })
    },

    getCountOfUnfinishedDialogs() {
        return fetch('/metrics/dialogs/countOfUnfinishedDialogs/', {
            method: 'GET'
        })
    },

    getCountOfNumberOfTicketsBreached() {
        return fetch('/metrics/dialogs/countOfNumberOfTicketsBreached/', {
            method: 'GET'
        })
    },

    getAvgSentimentTone() {
        return fetch('/metrics/dialogs/avgSentimentTone/', {
            method: 'GET'
        })
    },

    getSLAforART() {
        return fetch('/metrics/dialogs/SLAforART/', {
            method: 'GET'
        })
    },

    getSLAforFRT() {
        return fetch('/metrics/dialogs/SLAforFRT/', {
            method: 'GET'
        })
    },

}