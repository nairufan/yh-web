import '../node_modules/babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import Login from '../components/login/Index'
import { Provider } from 'react-redux'
import configureStore from '../store/store';

render(
    <Provider store={configureStore('loginReducers')}>
        <Login/>
    </Provider>,
    document.getElementById('content')
)
