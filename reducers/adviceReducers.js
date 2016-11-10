/**
 * Created by nairu on 2016/11/9.
 */
import { combineReducers } from 'redux';
import {ON_ERROR, REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_USER_BY_PHONE, CHANGE_TAB, MARK_RESOLVE} from '../constants/ActionTypes';
import update from 'react-addons-update';

const initState = {
    tab: -1,
    list: [],
    userMap: {},
    start: 0,
    size: 10,
};
function advice(state = initState, action) {
    switch (action.type) {
        case REQUEST_POSTS :
            return {...state, loading: true};
        case ON_ERROR:
            return {...state, loading: false, error: action.error};
        case CHANGE_TAB:
            return {...state, tab: action.tab, list: [], userMap: {}, start: 0};
        case RECEIVE_POSTS:
            const newList = action.list;
            const oldList = state.list;
            const allList = [...newList, ...oldList];
            const newUserMap = action.userMap;
            const oldUserMap = state.userMap;
            const allUserMap = {...newUserMap, ...oldUserMap};
            return {
                ...state,
                list: allList,
                userMap: allUserMap,
                loading: false,
                totalPages: action.totalPages,
                start: action.start
            };
        case MARK_RESOLVE:
            const {list} = state;
            const {id} = action;
            const index = list.findIndex(({id: itemId}) => id === itemId);
            if (index >= 0) {
                return update(state, {
                    list: {
                        [index]: {
                            status: {
                                $set: 1,
                            },
                        },
                    },
                });
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    advice,
})

export default rootReducer