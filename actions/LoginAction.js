/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';
import {ON_ERROR, REQUEST_POSTS} from '../constants/ActionTypes';

function requestPosts() {
    return {
        type: REQUEST_POSTS,
    }
}

export function onError(error) {
    return {
        type: ON_ERROR,
        error,
    }
}

export function login(tel, password) {
    return dispatch => {
        dispatch(requestPosts());
        return fetch('/user/admin-login', JSON.stringify({tel, password}), 'POST')
            .then((res)=> {
                if (res.success) {
                    window.location.href = '/statistic.html';
                } else {
                    dispatch(onError(res.msg));
                }
            }).catch((err)=> {
                dispatch(onError(err));
            });
    }
}


