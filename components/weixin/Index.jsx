import React, { Component, PropTypes } from 'react';
import '../../less/statistic.less';
import Header from '../common/Header';
import Statistic from '../statistic/Statistic';

import { connect } from 'react-redux';
import { getUserStatistic, getOrderStatistic, getCustomerStatistic, getGoodsStatistic } from '../../actions/WeiXinAction';

class Index extends Component {
    constructor() {
        super();
    }

    render() {
        const {dispatch, statistic} = this.props;
        return (
            <div>
                <Header title='小程序'/>
                <div className='main-body'>
                    <Statistic id='user'
                               label='新增用户'
                               title='用户总数'
                               statistic={{total: statistic.userTotal, data: statistic.userData}}
                               getStatistic={(startDate, endDate) => dispatch(getUserStatistic(startDate, endDate))}/>
                    <Statistic id='order'
                               label='新增订单'
                               title='订单总数'
                               statistic={{total: statistic.orderTotal, data: statistic.orderData}}
                               getStatistic={(startDate, endDate) => dispatch(getOrderStatistic(startDate, endDate))}/>
                    <Statistic id='customer'
                               label='新增客户'
                               title='客户总数'
                               statistic={{total: statistic.customerTotal, data: statistic.customerData}}
                               getStatistic={(startDate, endDate) => dispatch(getCustomerStatistic(startDate, endDate))}/>
                    <Statistic id='goods'
                               label='新增商品'
                               title='商品总数'
                               statistic={{total: statistic.goodsTotal, data: statistic.goodsData}}
                               getStatistic={(startDate, endDate) => dispatch(getGoodsStatistic(startDate, endDate))}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {statistic: state.statistic};
}
export default connect(mapStateToProps)(Index);