/**
 * Created by nairu on 2016/11/9.
 */
import { combineReducers } from 'redux';
import {GET_USER_STATISTIC, GET_ORDER_STATISTIC, GET_EXPRESS_STATISTIC} from '../constants/ActionTypes';
import update from 'react-addons-update';
import moment from 'moment';

const dayMillionSeconds = 24 * 60 * 60 * 1000;
const initState = {
    userTotal: 0,
    userData: [],
    orderTotal: 0,
    orderData: [],
    expressTotal: 0,
    expressData: [],
};
function statistic(state = initState, action) {
    switch (action.type) {
        case GET_USER_STATISTIC:
            const {total, statistics, startDate, endDate} = action;
            const userData = fillData(startDate, endDate, statistics);
            return {...state, userTotal: total, userData};
        case GET_ORDER_STATISTIC:
            const {total: orderTotal, statistics: orderStatistics, startDate: orderStartDate, endDate: orderEndDate} = action;
            const orderData = fillData(orderStartDate, orderEndDate, orderStatistics);
            return {...state, orderTotal, orderData};
        case GET_EXPRESS_STATISTIC:
            const {total: expressTotal, statistics: expressStatistics, startDate: expressStartDate, endDate: expressEndDate} = action;
            const expressData = fillData(expressStartDate, expressEndDate, expressStatistics);
            return {...state, expressTotal, expressData};
        default:
            return state
    }
}

function fillData(startDate, endDate, statistics) {
    const data = [];
    let tmpDate = startDate;
    while (tmpDate <= endDate) {
        data.push({
            date: new moment(tmpDate).format('YYYY-MM-DD'),
        });
        tmpDate += dayMillionSeconds;
    }
    for (let i = 0; i < data.length; i++) {
        const {date} = data[i];
        data[i].count = (statistics[date] && statistics[date]) || 0;
    }
    return data;
}

const rootReducer = combineReducers({
    statistic,
})

export default rootReducer