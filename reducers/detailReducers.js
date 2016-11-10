/**
 * Created by nairu on 2016/11/9.
 */
import { combineReducers } from 'redux';
import {CHANGE_TAB, REQUEST_POSTS, GET_ORDER_LIST, GET_CATEGORY_LIST, GET_GOODS_LIST, GET_CUSTOMER_LIST} from '../constants/ActionTypes';
import update from 'react-addons-update';

const initState = {
    tab: 'order',
    loading: false,
    list: [],
    totalPages: 0,
    start: 0,
    size: 10,
    categoryMap: {},
};
function detail(state = initState, action) {
    switch (action.type) {
        case REQUEST_POSTS :
            return {...state, loading: true};
        case CHANGE_TAB:
            return {
                ...state,
                tab: action.tab,
                list: [],
                categoryMap: {},
                totalPages: 0,
                start: 0,
                size: 10,
            };
        case GET_ORDER_LIST:
            const {list: orderList, totalPages: orderTotalPages, start: orderStart} = action;
            return update(state, {
                list: {
                    $push: orderList,
                },
                totalPages: {
                    $set: orderTotalPages,
                },
                start: {
                    $set: orderStart,
                },
                loading: {
                    $set: false,
                },
            });
        case GET_CATEGORY_LIST:
            const {list: categoryList, totalPages: categoryTotalPages, start: categoryStart} = action;
            return update(state, {
                list: {
                    $push: categoryList,
                },
                totalPages: {
                    $set: categoryTotalPages,
                },
                start: {
                    $set: categoryStart,
                },
                loading: {
                    $set: false,
                },
            });
        case GET_GOODS_LIST:
            const {list: goodsList, categoryMap, totalPages: goodsTotalPages, start: goodsStart} = action;
            return update(state, {
                list: {
                    $push: goodsList,
                },
                totalPages: {
                    $set: goodsTotalPages,
                },
                start: {
                    $set: goodsStart,
                },
                loading: {
                    $set: false,
                },
                categoryMap: {
                    $merge: categoryMap,
                },
            });
        case GET_CUSTOMER_LIST:
            const {list: customerList, totalPages: customerTotalPages, start: customerStart} = action;
            return update(state, {
                list: {
                    $push: customerList,
                },
                totalPages: {
                    $set: customerTotalPages,
                },
                start: {
                    $set: customerStart,
                },
                loading: {
                    $set: false,
                },
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    detail,
})

export default rootReducer