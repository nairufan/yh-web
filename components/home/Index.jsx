import React, { Component, PropTypes } from 'react';

import Header from '../common/Header';
import Users from './Users';

import '../../less/main.less';

export default class Index extends Component {
    render() {
        return (
        <div>
            <Header title='用户'/>
            <div className='main-body'>
                <Users/>
            </div>
        </div>
        )
    }
}
