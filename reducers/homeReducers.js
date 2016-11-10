/**
 * Created by nairu on 2016/11/9.
 */
import { combineReducers } from 'redux';
import {ON_ERROR, REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_USER_BY_PHONE} from '../constants/ActionTypes';

const initState = {
    start: 0,
    size: 10,
    totalPages: 0,
    list: [],
};
function home(state = initState, action) {
    switch (action.type) {
        case REQUEST_POSTS :
            return {...state, loading: true};
        case ON_ERROR:
            return {...state, loading: false, error: action.error};
        case RECEIVE_POSTS:
            const newList = action.list;
            const oldList = state.list;
            const allList = [...oldList, ...newList];
            return {...state, list: allList, loading: false, totalPages: action.totalPages, start: action.start};
        case RECEIVE_USER_BY_PHONE:
            const user = action.user;
            const userList = [];
            if (!!user) {
                userList.push(user);
            }
            return {...state, list: userList, loading: false, totalPages: 0, start: 0};
        default:
            return state
    }
}

const rootReducer = combineReducers({
    home,
})

export default rootReducer