/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';
import {receiveStatistic} from '../utils/common';
import {
    GET_USER_STATISTIC,
    GET_ORDER_STATISTIC,
    GET_CUSTOMER_STATISTIC,
    GET_GOODS_STATISTIC
} from '../constants/ActionTypes';

export function getUserStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/user/statistics', null, null, true)
            .then((res) => {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_USER_STATISTIC));
            }).catch((err) => {
                console.log(err);
            });
    }
}

export function getOrderStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/order/statistics', null, null, true)
            .then((res) => {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_ORDER_STATISTIC));
            }).catch((err) => {
                console.log(err);
            });
    }
}

export function getCustomerStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/customer/statistics', null, null, true)
            .then((res) => {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_CUSTOMER_STATISTIC));
            }).catch((err) => {
                console.log(err);
            });
    }
}

export function getGoodsStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/goods/statistics', null, null, true)
            .then((res) => {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_GOODS_STATISTIC));
            }).catch((err) => {
                console.log(err);
            });
    }
}