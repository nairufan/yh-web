import React, { Component, PropTypes } from 'react';
import Header from '../common/Header';
import Users from '../home/Users';
import Order from './Order';
import Category from './Category';
import Goods from './Goods';
import Customer from './Customer';
import '../../less/detail.less';
import {getParameterByName} from '../../utils/common';
import {connect} from 'react-redux';
import {changeTab, getOrderList, getCategoryList, getGoodsList, getCustomerList} from '../../actions/DetailAction';

const tabs = [
    {key: 'order', value: '订单'},
    {key: 'category', value: '分类'},
    {key: 'goods', value: '商品'},
    {key: 'customer', value: '客户'},
];

class Index extends Component {
    constructor() {
        super();
        this.state = {
            tab: tabs[0].key,
        }
    }

    renderNav() {
        const {detail, dispatch} = this.props;
        const {tab} = detail || {};
        return (
            <ul>
                {
                    tabs.map(({key, value}) => (
                        <li key={key}
                            className={(key === tab) && 'active'}
                            onClick={() => dispatch(changeTab(key))}>{value}</li>
                    ))
                }
            </ul>
        );
    }

    render() {
        const {detail, dispatch} = this.props;
        const {tab} = detail || {};
        let userId = getParameterByName('userId');
        let childComponent;
        switch (tab) {
            case 'order':
                childComponent = <Order userId={userId}
                                        detail={detail}
                                        getOrderList={(start, size, userId) => dispatch(getOrderList(start, size, userId))}/>;
                break;
            case 'category':
                childComponent = <Category userId={userId}
                                           detail={detail}
                                           getCategoryList={(start, size, userId) => dispatch(getCategoryList(start, size, userId))}/>;
                break;
            case 'goods':
                childComponent = <Goods userId={userId}
                                        detail={detail}
                                        getGoodsList={(start, size, userId) => dispatch(getGoodsList(start, size, userId))}/>;
                break;
            case 'customer':
                childComponent = <Customer userId={userId}
                                           detail={detail}
                                           getCustomerList={(start, size, userId) => dispatch(getCustomerList(start, size, userId))}/>;
                break;
            default:
                childComponent = <Order userId={userId}
                                        detail={detail}
                                        getOrderList={(start, size, userId) => dispatch(getOrderList(start, size, userId))}/>;
        }
        return (
            <div>
                <Header title='详细'/>
                <div className='main-body detail'>
                    <div className='nav-bar'>
                        {this.renderNav()}
                    </div>
                    <div className='content'>
                        {childComponent}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {detail: state.detail};
}
export default connect(mapStateToProps)(Index);