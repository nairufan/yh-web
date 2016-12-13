/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';
import {GET_DOCUMENT_STATISTIC, GET_ORDER_STATISTIC} from '../constants/ActionTypes';


function receiveDocumentStatistic(total, statistics, startDate, endDate) {
    return {
        type: GET_DOCUMENT_STATISTIC,
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

export function getDocumentStatistic(startDate, endDate) {
    return dispatch => {
        return fetch('/document/statistics')
            .then((res)=> {
                const {total, statistics} = res;
                dispatch(receiveDocumentStatistic(total, statistics, startDate, endDate));
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
                dispatch(receiveOrderStatistic(total, statistics, startDate, endDate));
            }).catch((err)=> {
                console.log(err);
            });
    }
}