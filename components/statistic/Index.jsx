import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import '../../less/statistic.less';
import Header from '../common/Header';
import UserStatistic from './UserStatistic';
import OrderStatistic from './OrderStatistic';
import ExpressStatistic from './ExpressStatistic';

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Header title='统计'/>
                <div className='main-body'>
                    <UserStatistic/>
                    <OrderStatistic/>
                    <ExpressStatistic/>
                </div>
            </div>
        );
    }
}