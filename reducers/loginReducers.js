/**
 * Created by nairu on 2016/11/9.
 */
import { combineReducers } from 'redux';
import {
    ON_ERROR, REQUEST_POSTS
} from '../constants/ActionTypes';

function login(state = { }, action) {
    switch (action.type) {
        case REQUEST_POSTS :
            return {...state, loading: true};
        case ON_ERROR:
            return {...state, loading: false, error: action.error};
        default:
            return state
    }
}

const rootReducer = combineReducers({
    login,
})

export default rootReducer