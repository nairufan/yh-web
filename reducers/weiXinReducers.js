/**
 * Created by nairu on 2016/11/9.
 */
import {combineReducers} from 'redux';
import {
    GET_USER_STATISTIC,
    GET_ORDER_STATISTIC,
    GET_CUSTOMER_STATISTIC,
    GET_GOODS_STATISTIC
} from '../constants/ActionTypes';
import {fillData} from '../utils/common';

const initState = {
    userTotal: 0,
    userData: [],
    orderTotal: 0,
    orderData: [],
    customerTotal: 0,
    customerData: [],
    goodsTotal: 0,
    goodsData: [],
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
        case GET_CUSTOMER_STATISTIC:
            const {total: customerTotal, statistics: customerStatistics, startDate: customerStartDate, endDate: customerEndDate} = action;
            const customerData = fillData(customerStartDate, customerEndDate, customerStatistics);
            return {...state, customerTotal, customerData};
        case GET_GOODS_STATISTIC:
            const {total: goodsTotal, statistics: goodsStatistics, startDate: goodsStartDate, endDate: goodsEndDate} = action;
            const goodsData = fillData(goodsStartDate, goodsEndDate, goodsStatistics);
            return {...state, goodsTotal, goodsData};
        default:
            return state
    }
}


const rootReducer = combineReducers({
    statistic,
})

export default rootReducer