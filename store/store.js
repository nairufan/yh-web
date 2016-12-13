/**
 * Created by nairu on 2016/11/10.
 */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import loginReducers from '../reducers/loginReducers';
import statisticReducers from '../reducers/statisticReducers';

const loggerMiddleware = createLogger();
const reducerMap = {
    loginReducers,
    statisticReducers,
};
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

export default function configureStore(reducer, initialState) {
    return createStoreWithMiddleware(reducerMap[reducer], initialState);
}