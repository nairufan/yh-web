import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import '../../less/statistic.less';
import Header from '../common/Header';
import OrderStatistic from './OrderStatistic';
import DocumentStatistic from './DocumentStatistic';
import { connect } from 'react-redux';
import { getDocumentStatistic, getOrderStatistic } from '../../actions/StatisticAction';

class Index extends Component {
    constructor() {
        super();
    }

    render() {
        const {dispatch, statistic} = this.props;
        return (
            <div>
                <Header title='统计'/>
                <div className='main-body'>
                    <DocumentStatistic statistic={statistic}
                                      getStatistic={(startDate, endDate) => dispatch(getDocumentStatistic(startDate, endDate))}/>
                    <OrderStatistic statistic={statistic}
                                       getStatistic={(startDate, endDate) => dispatch(getOrderStatistic(startDate, endDate))}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {statistic: state.statistic};
}
export default connect(mapStateToProps)(Index);