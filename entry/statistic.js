import React from 'react'
import {render} from 'react-dom'
import Statistic from '../components/statistic/Index'
import { Provider } from 'react-redux'
import configureStore from '../store/store';

render(
    <Provider store={configureStore('statisticReducers')}>
        <Statistic/>
    </Provider>,
    document.getElementById('content')
)
