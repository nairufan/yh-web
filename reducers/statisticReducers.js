/**
 * Created by nairu on 2016/11/9.
 */
import { combineReducers } from 'redux';
import {GET_DOCUMENT_STATISTIC, GET_ORDER_STATISTIC, GET_TOP_DOCUMENT_STATISTIC, GET_TOP_STATISTIC} from '../constants/ActionTypes';
import {fillData} from '../utils/common';

const initState = {
    documentTotal: 0,
    documentData: [],
    orderTotal: 0,
    orderData: [],
    topDcTotal: 0,
    tdcData: [],
    topTotal: 0,
    tData: [],
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
        case GET_TOP_DOCUMENT_STATISTIC:
            const {total: topDcTotal, statistics: topDcStatistics, startDate: topDcStartDate, endDate: topDcEndDate} = action;
            const tdcData = fillData(topDcStartDate, topDcEndDate, topDcStatistics);
            return {...state, topDcTotal, tdcData};
        case GET_TOP_STATISTIC:
            const {total: topTotal, statistics: topStatistics, startDate: topStartDate, endDate: topEndDate} = action;
            const tData = fillData(topStartDate, topEndDate, topStatistics);
            return {...state, topTotal, tData};
        default:
            return state
    }
}

const rootReducer = combineReducers({
    statistic,
})

export default rootReducer