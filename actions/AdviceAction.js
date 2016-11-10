/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';
import {ON_ERROR, REQUEST_POSTS, CHANGE_TAB, RECEIVE_POSTS, MARK_RESOLVE} from '../constants/ActionTypes';


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

function receivePosts(list, totalPages, start, userMap) {
    return {
        type: RECEIVE_POSTS,
        list,
        totalPages,
        start,
        userMap,
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

export function getAdvice(start, size, tab) {
    return dispatch => {
        dispatch(requestPosts());
        return fetch(`/advice/list?start=${start}&size=${size}&status=${tab}`)
            .then((res)=> {
                const {list, totalPages, userMap} = res;
                dispatch(receivePosts(list, totalPages, start + 1, userMap));
            }).catch((err)=> {
                dispatch(onError(err));
            });
    }
}

export function markResolve(id) {

    return dispatch => {
        dispatch(resolve(id));
        return fetch(`/advice/resolve/${id}`, {}, 'POST');
    }
}


