import React from 'react'
import {render} from 'react-dom'
import Detail from '../components/detail/Index'
import { Provider } from 'react-redux';
import configureStore from '../store/store';

render(
    <Provider store={configureStore('detailReducers')}>
        <Detail/>
    </Provider>,
    document.getElementById('content')
)
