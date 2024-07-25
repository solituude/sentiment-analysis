export function formatDate(date) {
    // Преобразуем дату в строку с форматом "день/месяц/год"
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function generatePastDates(inputDate) {
    const [day, month, year] = inputDate.split('/').map(Number);
    const currentDate = new Date(year, month - 1, day);
    const pastDates = [];

    for (let i = 0; i <= 7; i++) {
        const pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - i);
        pastDates.push(formatDate(pastDate));
    }

    return pastDates;
}

export function filterDateRanges(dateRanges, startDateStr, endDateStr) {
    let selectedDates = [];

    const startDateParts = startDateStr.split('/').map(Number);
    const endDateParts = endDateStr.split('/').map(Number);

    const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
    const endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

    dateRanges.forEach(dateRange => {
        const [startStr, endStr] = dateRange.date.split('-');
        const startParts = startStr.split('/').map(Number);
        const endParts = endStr.split('/').map(Number);

        const start = new Date(startParts[2], startParts[1] - 1, startParts[0]);
        const end = new Date(endParts[2], endParts[1] - 1, endParts[0]);

        if ((start <= startDate  <= end) || (start <= endDate  <= end)) {
            if (!selectedDates.includes(dateRange.date)) {
                selectedDates.push(dateRange.date);
            }
        }

    });

    return selectedDates;
}

export function filterObjectsByDateRange(objects, startDate, endDate) {
    const [startDay, startMonth, startYear] = startDate.split('/');
    const [endDay, endMonth, endYear] = endDate.split('/');

    const startDateObject = new Date(`${startMonth}/${startDay}/${startYear}`);
    const endDateObject = new Date(`${endMonth}/${endDay}/${endYear}`);

    const filteredData = [];

    objects.forEach((obj) => {
        const [objDay, objMonth, objYear] = obj.date.split('/');
        const objDate = new Date(`${objMonth}/${objDay}/${objYear}`);

        if (objDate >= startDateObject && objDate <= endDateObject) {
            // Вставляйте элементы в начало массива, чтобы сохранить обратный порядок
            filteredData.unshift(obj.date);
        }
    });

    return filteredData;
}

export function findIndexesByDates(data, rangeDates) {

    let startDate = rangeDates[0];
    let endDate = rangeDates[rangeDates.length - 1];

    let startIndex = -1;
    let endIndex = -1;

    for (let i = 0; i < data.length - 1; i++) {
        if (data[i].date === endDate && endIndex === -1) {
            endIndex = i;
        } else {
            for (let j = 0; j < rangeDates.length - 1; j++) {
                if (data[i].date === rangeDates[j] && endIndex === -1) {
                    endIndex = i;
                }
            }
        }
    }

    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].date === startDate && startIndex === -1) {
            startIndex = i;
        } else {
            for (let j = rangeDates.length - 1; j >= 0; j--) {
                if (data[i].date === rangeDates[j] && startIndex === -1) {
                    startIndex = i;
                }
            }
        }
    }

    return {
        startIndex,
        endIndex,
    };
}

