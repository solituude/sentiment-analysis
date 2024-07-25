// получение данных FRT из всех данных по чатам
export function getValuesFRT(data) {
    let valuesFRT = [];
    for (let i = 0; i < data?.length; i++) {
        valuesFRT.push(data[i].FRT);
    }

    return valuesFRT;
}

// получение среднего значения FRT
export const averageFRT = (valuesFRT) => {
    const sumValues = valuesFRT.reduce((sum, item) => sum + item, 0);
    return Math.round(sumValues / valuesFRT.length);
}

// получение данных ART из всех данных по чатам
export function getValuesART(data) {
    let valuesART = [];
    for (let i = 0; i < data?.length; i++) {
        valuesART.push(data[i].ART);
    }

    return valuesART;
}

// получение среднего значения FRT
export const averageART = (valuesART) => {
    const sumValues = valuesART.reduce((sum, item) => sum + item, 0);
    return Math.round(sumValues / valuesART.length);
}

// округление числа для оси У
export const roundUpToNearestPowerOfTen = (number) => {
    const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(number)));
    return Math.ceil(number / orderOfMagnitude) * orderOfMagnitude;
}

