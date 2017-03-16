/**
 * Created by nairu on 2016/11/10.
 */

import moment from 'moment';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function receiveStatistic(total, statistics, startDate, endDate, type) {
    return {
        type,
        total,
        statistics,
        startDate,
        endDate,
    }
}

const dayMillionSeconds = 24 * 60 * 60 * 1000;

function fillData(startDate, endDate, statistics) {
    const data = [];
    const statisticsMap = {};
    if (statistics) {
        statistics.forEach(({_id, count}) => {
            statisticsMap[_id] = count;
        });
    }
    let tmpDate = startDate;
    while (tmpDate <= endDate) {
        data.push({
            date: new moment(tmpDate).format('YYYY-MM-DD'),
        });
        tmpDate += dayMillionSeconds;
    }
    for (let i = 0; i < data.length; i++) {
        const {date} = data[i];
        data[i].count = statisticsMap[date] || 0;
    }
    return data;
}

module.exports = {
    getParameterByName,
    receiveStatistic,
    fillData,
};
