/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';
import {GET_USER_STATISTIC, GET_ORDER_STATISTIC, GET_EXPRESS_STATISTIC} from '../constants/ActionTypes';


function receiveUserStatistic(total, statistics, startDate, endDate) {
    return {
        type: GET_USER_STATISTIC,
        total,
        statistics,
        startDate,
        endDate,
    }
}

function receiveOrderStatistic(total, statistics, startDate, endDate) {
    return {
        type: GET_ORDER_STATISTIC,
        total,
        statistics,
        startDate,
        endDate,
    }
}

function receiveExpressStatistic(total, statistics, startDate, endDate) {
    return {
        type: GET_EXPRESS_STATISTIC,
        total,
        statistics,
        startDate,
        endDate,
    }
}

export function getUserStatistic(startDate, endDate) {
    return dispatch => {
        return fetch(`/user/statistics?start=${startDate}&end=${endDate}`)
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveUserStatistic(total, statistics, startDate, endDate));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getOrderStatistic(startDate, endDate) {
    return dispatch => {
        return fetch(`/order/statistics?start=${startDate}&end=${endDate}`)
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveOrderStatistic(total, statistics, startDate, endDate));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getExpressStatistic(startDate, endDate) {
    return dispatch => {
        return fetch(`/express/statistics?start=${startDate}&end=${endDate}`)
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveExpressStatistic(total, statistics, startDate, endDate));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

