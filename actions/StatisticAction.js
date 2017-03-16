/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';
import {receiveStatistic} from '../utils/common';
import {GET_DOCUMENT_STATISTIC, GET_ORDER_STATISTIC, GET_TOP_DOCUMENT_STATISTIC, GET_TOP_STATISTIC} from '../constants/ActionTypes';

export function getDocumentStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/document/statistics')
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_DOCUMENT_STATISTIC));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getOrderStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/document/order-statistics')
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_ORDER_STATISTIC));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getTopDocumentStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/top/document-statistics')
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_TOP_DOCUMENT_STATISTIC));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getTopStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/top/statistics')
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveStatistic(total, statistics, startDate, endDate, GET_TOP_STATISTIC));
            }).catch((err)=> {
                console.log(err);
            });
    }
}