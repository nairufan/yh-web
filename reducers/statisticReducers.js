/**
 * Created by nairu on 2016/11/9.
 */
import { combineReducers } from 'redux';
import {GET_DOCUMENT_STATISTIC, GET_ORDER_STATISTIC} from '../constants/ActionTypes';
import update from 'react-addons-update';
import moment from 'moment';

const dayMillionSeconds = 24 * 60 * 60 * 1000;
const initState = {
    documentTotal: 0,
    documentData: [],
    orderTotal: 0,
    orderData: [],
};
function statistic(state = initState, action) {
    switch (action.type) {
        case GET_DOCUMENT_STATISTIC:
            const {total, statistics, startDate, endDate} = action;
            const documentData = fillData(startDate, endDate, statistics);
            return {...state, documentTotal: total, documentData};
        case GET_ORDER_STATISTIC:
            const {total: orderTotal, statistics: orderStatistics, startDate: orderStartDate, endDate: orderEndDate} = action;
            const orderData = fillData(orderStartDate, orderEndDate, orderStatistics);
            return {...state, orderTotal, orderData};
        default:
            return state
    }
}

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

const rootReducer = combineReducers({
    statistic,
})

export default rootReducer