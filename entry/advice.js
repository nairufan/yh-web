import React from 'react';
import {render} from 'react-dom';
import Advice from '../components/advice/Index';
import { Provider } from 'react-redux';
import configureStore from '../store/store';

render(
    <Provider store={configureStore('adviceReducers')}>
        <Advice/>
    </Provider>,
    document.getElementById('content')
);
