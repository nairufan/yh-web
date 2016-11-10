/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';
import {REQUEST_POSTS, CHANGE_TAB, GET_ORDER_LIST, GET_CATEGORY_LIST, GET_GOODS_LIST, GET_CUSTOMER_LIST} from '../constants/ActionTypes';


function requestPosts() {
    return {
        type: REQUEST_POSTS,
    }
}

function onError(error) {
    return {
        type: ON_ERROR,
        error,
    }
}

function getOrderResult(list, totalPages, start) {
    return {
        type: GET_ORDER_LIST,
        list,
        totalPages,
        start,
    }
}

function getCategoryResult(list, totalPages, start) {
    return {
        type: GET_CATEGORY_LIST,
        list,
        totalPages,
        start,
    }
}

function getGoodsResult(list, categoryMap, totalPages, start) {
    return {
        type: GET_GOODS_LIST,
        list,
        totalPages,
        start,
        categoryMap,
    }
}

function getCustomerResult(list, totalPages, start) {
    return {
        type: GET_CUSTOMER_LIST,
        list,
        totalPages,
        start,
    }
}


function resolve(id) {
    return {
        type: MARK_RESOLVE,
        id,
    }
}

export function changeTab(tab) {
    return {
        type: CHANGE_TAB,
        tab,
    }
}

export function getOrderList(start, size, userId) {
    return dispatch => {
        dispatch(requestPosts());
        let url = `/order/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        return fetch(url)
            .then((res)=> {
                const {orderList, totalPages} = res;
                dispatch(getOrderResult(orderList, totalPages, start + 1));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getCategoryList(start, size, userId) {
    return dispatch => {
        dispatch(requestPosts());
        let url = `/category/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        return fetch(url)
            .then((res)=> {
                const {categoryList, totalPages} = res;
                dispatch(getCategoryResult(categoryList, totalPages, start + 1));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getGoodsList(start, size, userId) {
    return dispatch => {
        dispatch(requestPosts());
        let url = `/goods/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        return fetch(url)
            .then((res)=> {
                const {goodsList, totalPages, categoryMap} = res;
                dispatch(getGoodsResult(goodsList, categoryMap, totalPages, start + 1));
            }).catch((err)=> {
                console.log(err);
            });
    }
}

export function getCustomerList(start, size, userId) {
    return dispatch => {
        dispatch(requestPosts());
        let url = `/customer/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        return fetch(url)
            .then((res)=> {
                const {customerList, totalPages} = res;
                dispatch(getCustomerResult(customerList, totalPages, start + 1));
            }).catch((err)=> {
                console.log(err);
            });
    }
}


