//берем последние значения тональности 
export function getLastNValues2(data) {
    const values = [];

    for (let i = 0; i < data?.length; i++) {
        values.push(data[i].sentiment);
    }

    return values;
}

//берем последние значения дат 
export function getLastNDates(data) {
    const values = [];

    for (let i = 0; i < data?.length; i++) {
        values.push(data[i].date);
    }

    return values;
}

//берем последние значения количества чатов
export function getLastNumbersOfChats(data) {
    const values = [];

    for (let i = 0; i < data?.length; i++) {
        values.push(data[i].count);
    }   

    return values;
}

// считаем средний sentiment в массиве
function calculateAverageSentiment(weekData) {
    const sum = weekData.reduce((total, { sentiment }) => total + sentiment, 0);
    return Math.round(sum / weekData.length);
}

// считаем количество диалогов в массиве
function calculateTotalCount(weekData) {
    return weekData.reduce((total, { count }) => total + count, 0);
}

function calculateAverageART(data) {
    const totalART = data.reduce((acc, entry) => acc + entry.ART, 0);
    return Math.ceil(totalART / data.length);
}

function calculateAverageFRT(data) {
    const totalFRT = data.reduce((acc, entry) => acc + entry.FRT, 0);
    return Math.ceil(totalFRT / data.length);
}

// Объединяем диалоги в дни
export function calculateAverageSentimentByDate(data) {
    const combinedData = {};

    data.forEach(entry => {
        const { date, sentiment, ART, FRT } = entry;

        if (combinedData[date]) {
            combinedData[date].sentimentSum += sentiment;
            combinedData[date].ARTSum += ART;
            combinedData[date].FRTSum += FRT;
            combinedData[date].count += 1;
        } else {
            combinedData[date] = {
                sentimentSum: sentiment,
                ARTSum: ART,
                FRTSum: FRT,
                count: 1
            };
        }
    });

    const result = Object.entries(combinedData).map(([date, { sentimentSum, ARTSum, FRTSum, count }]) => {
        const sentiment = Math.ceil(sentimentSum / count);
        const ART = Math.ceil(ARTSum / count);
        const FRT = Math.ceil(FRTSum / count);
        return { date, sentiment, ART, FRT, count };
    });

    return result;
}

// Объединение недель по дням
export function groupDataByWeek(data) {
    let count1 = 0;
    const groupedData = [];
    let currentWeek = [];
    let startDate = null;
    let endDate = null;

    for (let i = 0; i < data.length; i++) {
        const { date, sentiment, ART, FRT, count } = data[i];

        if (!startDate) {
            startDate = date;
            currentWeek.push({ date, sentiment, ART, FRT, count });
            count1 += 1;
        } else {
            if (count1 < 7) {
                currentWeek.push({ date, sentiment, ART, FRT, count });
                count1 += 1;
            } else {
                groupedData.push({
                    date: `${startDate}-${endDate}`,
                    sentiment: calculateAverageSentiment(currentWeek),
                    ART: calculateAverageART(currentWeek),
                    FRT: calculateAverageFRT(currentWeek),
                    count: calculateTotalCount(currentWeek)
                });
                count1 = 0;
                startDate = date;
                currentWeek = [{ date, sentiment, ART, FRT, count }];
            }
        }

        endDate = date;
    }

    if (currentWeek.length > 0) {
        groupedData.push({
            date: `${startDate}-${endDate}`,
            sentiment: calculateAverageSentiment(currentWeek),
            ART: calculateAverageART(currentWeek),
            FRT: calculateAverageFRT(currentWeek),
            count: calculateTotalCount(currentWeek)
        });
    }

    return groupedData;
}



// Объединение недель в месяца
export function groupDataByMonths(data) {
    let count2 = 0;
    const groupedData = [];
    let currentMonth = [];
    let startDate = null;
    let endDate = null;

    for (let i = 0; i < data.length; i++) {
        const { date, sentiment, count, ART, FRT } = data[i];

        if (!startDate) {
            startDate = date.split('-')[0];
            currentMonth.push({ date, sentiment, count, ART, FRT });
            count2 += 1
        } else {

            if (count2 < 4) {
                currentMonth.push({ date, sentiment, count, ART, FRT });
                count2 += 1
            } else {
                groupedData.push({
                    date: `${startDate}-${endDate}`,
                    sentiment: calculateAverageSentiment(currentMonth),
                    ART: calculateAverageART(currentMonth),
                    FRT: calculateAverageFRT(currentMonth),
                    count: calculateTotalCount(currentMonth)
                });
                count2 = 0
                startDate = date.split('-')[0];
                currentMonth = [{ date, sentiment, count, ART, FRT }];
            }
        }

        endDate = date.split('-')[1];

    }

    if (currentMonth.length > 0) {
        groupedData.push({
            date: `${startDate}-${endDate}`,
            sentiment: calculateAverageSentiment(currentMonth),
            ART: calculateAverageART(currentMonth),
            FRT: calculateAverageFRT(currentMonth),
            count: calculateTotalCount(currentMonth)
        });
    }

    return groupedData;
}

//Объединение месяцев в года
export function groupDataByYear(data) {
    let count3 = 0;
    const groupedData = [];
    let currentYear = [];
    let startDate = null;
    let endDate = null;

    for (let i = 0; i < data.length; i++) {
        const { date, sentiment, count, ART, FRT } = data[i];

        if (!startDate) {
            startDate = date.split('-')[0];
            currentYear.push({ date, sentiment, count, ART, FRT });
            count3 += 1
        } else {

            if (count3 < 12) {
                currentYear.push({ date, sentiment, count, ART, FRT });
                count3 += 1
            } else {
                groupedData.push({
                    date: `${startDate}-${endDate}`,
                    sentiment: calculateAverageSentiment(currentYear),
                    ART: calculateAverageART(currentYear),
                    FRT: calculateAverageFRT(currentYear),
                    count: calculateTotalCount(currentYear)
                });
                count3 = 0
                startDate = date.split('-')[0];
                currentYear = [{ date, sentiment, count, ART, FRT }];
            }
        }

        endDate = date.split('-')[1];

    }

    if (currentYear.length > 0) {
        groupedData.push({
            date: `${startDate}-${endDate}`,
            sentiment: calculateAverageSentiment(currentYear),
            ART: calculateAverageART(currentYear),
            FRT: calculateAverageFRT(currentYear),
            count: calculateTotalCount(currentYear)
        });
    }

    return groupedData;
}