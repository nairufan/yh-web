import React from 'react'
import {render} from 'react-dom'
import Home from '../components/home/Index'
import { Provider } from 'react-redux'
import configureStore from '../store/store';

render(
    <Provider store={configureStore('homeReducers')}>
        <Home/>
    </Provider>,
    document.getElementById('content')
)
