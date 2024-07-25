// проверка наличия данных в n-ом месяце
export const availabilityValue = (year, month, data) => {
    let next = true;
    let prev = true;
    // для последнего меясца года
    if (month === 11) {
        if ( findRatingByYearAndMonth(year + 1, 0, data) === null) {
            next = false;
        }
        if (findRatingByYearAndMonth(year, month - 1, data) === null) {
            prev = false;
        }

    }

    // для первого месяца года
    else if (month === 0) {
        if (findRatingByYearAndMonth(year - 1, 11, data) === null) {
            prev = false;
        }
        if (findRatingByYearAndMonth(year, month + 1, data) === null) {
            next = false;
        }
    }
    // для остальных месяцев
    else {
        if (findRatingByYearAndMonth(year, month - 1, data) === null) {
            prev = false;
        }
        if (findRatingByYearAndMonth(year, month + 1, data) === null) {
            next = false;
        }
    }

    return [prev, next]
}

// возвращение рейтинга определенного месяца
export const findRatingByYearAndMonth = (year, month, receivedData) => {
    const yearData = receivedData.find(item => item.year === year);
    if (yearData) {
        const monthData = yearData.data.find(data => data.month === month);

        if (monthData && monthData.rating) {
            return monthData.rating;
        }
    }
    return null;
}

export const updateCurrentData = (rating, defaultData) => {
    let sum = rating.reduce((sum, item) => { return sum + item }, 0);
    return defaultData.map((item, index) => {
        const newCount = rating[index];
        const newPercent = Math.round((newCount / sum) * 100);

        return {
            ...item,
            count: newCount,
            percent: newPercent,
        };
    });
}

// возвращение общей статистики по графику
export const getStatistic = (rating) => {

    let negativeCount = rating.slice(0, 5).reduce((sum, item) => {return sum + item}, 0);
    let neutralCount = rating.slice(5, 7).reduce((sum, item) => {return sum + item}, 0);
    let positiveCount = rating.slice(7, 10).reduce((sum, item) => {return sum + item}, 0);

    let summary = negativeCount + neutralCount + positiveCount;

    return {
        "negative": {
            "count": negativeCount,
            "percent": Math.round(negativeCount / summary * 100),
        },
        "neutral": {
            "count": neutralCount,
            "percent": Math.round(neutralCount / summary * 100),
        },
        "positive": {
            "count": positiveCount,
            "percent": Math.round(positiveCount / summary * 100),
        },
    }
}

//возвращение месяца в виде строки
export const returnStringMonth = (monthNumber) => {
    switch (monthNumber){
        case 0:
            return 'Январь';
        case 1:
            return "Февраль";
        case 2:
            return "Март";
        case 3:
            return "Апрель";
        case 4:
            return "Май";
        case 5:
            return "Июнь";
        case 6:
            return "Июль";
        case 7:
            return "Август";
        case 8:
            return "Сентябрь";
        case 9:
            return "Октябрь";
        case 10:
            return "Ноябрь";
        case 11:
            return "Декабрь";
        default:
            return null;
    }
}


export const getMaxValueY = (data) => {
    let maxPercent = 0;
    for (let i = 0; i < data.length; i++) {
        maxPercent = Math.max(maxPercent, data[i].percent);
    }
    return maxPercent;
}