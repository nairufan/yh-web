import React from 'react'
import {render} from 'react-dom'
import WeiXin from '../components/weixin/Index'
import { Provider } from 'react-redux'
import configureStore from '../store/store';

render(
    <Provider store={configureStore('weiXinReducers')}>
        <WeiXin/>
    </Provider>,
    document.getElementById('content')
)
