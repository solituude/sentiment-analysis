export function findLastTrueField(obj) {
    const keys = Object.keys(obj);
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        if (obj[key]) {
            return key;
        }
    }
    return null;
}


export const fromDateToString = (stringDate) => {
    let day = (stringDate.getDate()).toString();
    let month = (stringDate.getMonth() + 1).toString();
    let year = stringDate.getFullYear();
    if (day.length === 1) {
        day = '0' + day.toString();
    }
    if (month.length === 1) {
        month = '0' + month.toString();
        console.log(month)
    }
    return `${day}/${month}/${year}`;
}