import React, { Component, PropTypes } from 'react';
import '../../less/statistic.less';
import Header from '../common/Header';
import Statistic from './Statistic';

import { connect } from 'react-redux';
import { getDocumentStatistic, getOrderStatistic, getTopDocumentStatistic, getTopStatistic } from '../../actions/StatisticAction';

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
                    <Statistic id='document'
                               label='新增文档'
                               title='文档总数'
                               statistic={{total: statistic.documentTotal, data: statistic.documentData}}
                               getStatistic={(startDate, endDate) => dispatch(getDocumentStatistic(startDate, endDate))}/>
                    <Statistic id='order'
                               label='新增订单'
                               title='订单总数'
                               statistic={{total: statistic.orderTotal, data: statistic.orderData}}
                               getStatistic={(startDate, endDate) => dispatch(getOrderStatistic(startDate, endDate))}/>
                    <Statistic id='topDocument'
                               label='新增排名文档'
                               title='排名文档总数'
                               statistic={{total: statistic.topDcTotal, data: statistic.tdcData}}
                               getStatistic={(startDate, endDate) => dispatch(getTopDocumentStatistic(startDate, endDate))}/>
                    <Statistic id='topOrder'
                               label='新增排名'
                               title='排名总数'
                               statistic={{total: statistic.topTotal, data: statistic.tData}}
                               getStatistic={(startDate, endDate) => dispatch(getTopStatistic(startDate, endDate))}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {statistic: state.statistic};
}
export default connect(mapStateToProps)(Index);