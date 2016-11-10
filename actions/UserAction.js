/**
 * Created by nairu on 2016/11/9.
 */
import {fetch} from '../utils/fetch';
import {ON_ERROR, REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_USER_BY_PHONE} from '../constants/ActionTypes';

function requestPosts() {
    return {
        type: REQUEST_POSTS,
    }
}

function receivePosts(list, totalPages, start) {
    return {
        type: RECEIVE_POSTS,
        list,
        totalPages,
        start,
    }
}

function receiveUserByPhone(user) {
    return {
        type: RECEIVE_USER_BY_PHONE,
        user,
    }
}

function onError(error) {
    return {
        type: ON_ERROR,
        error,
    }
}

export function getUserList(start, size) {
    return dispatch => {
        dispatch(requestPosts());
        return fetch(`/user/list?start=${start}&size=${size}`)
            .then((res)=> {
                const {list, totalPages} = res;
                dispatch(receivePosts(list, totalPages, start + 1));
            }).catch((err)=> {
                dispatch(onError(err));
            });
    }
}

export function getUserByPhone(phone) {
    return dispatch => {
        dispatch(requestPosts());
        return fetch(`/user/${phone}`)
            .then((res)=> {
                const {Result} = res;
                dispatch(receiveUserByPhone(Result));
            }).catch((err)=> {
                dispatch(onError(err));
            });
    }
}