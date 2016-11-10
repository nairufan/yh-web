import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import '../../less/statistic.less';
import Header from '../common/Header';
import UserStatistic from './UserStatistic';
import OrderStatistic from './OrderStatistic';
import ExpressStatistic from './ExpressStatistic';
import { connect } from 'react-redux';
import { getUserStatistic, getOrderStatistic, getExpressStatistic } from '../../actions/StatisticAction';

class Index extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const {dispatch, statistic} = this.props;
        return (
            <div>
                <Header title='统计'/>
                <div className='main-body'>
                    <UserStatistic statistic={statistic}
                                   getStatistic={(startDate, endDate) => dispatch(getUserStatistic(startDate, endDate))}/>
                    <OrderStatistic statistic={statistic}
                                    getStatistic={(startDate, endDate) => dispatch(getOrderStatistic(startDate, endDate))}/>
                    <ExpressStatistic statistic={statistic}
                                      getStatistic={(startDate, endDate) => dispatch(getExpressStatistic(startDate, endDate))}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {statistic: state.statistic};
}
export default connect(mapStateToProps)(Index);