/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
export default class Customer extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.getCustomerList();
    }

    getCustomerList() {
        const {userId, getCustomerList, detail} = this.props;
        const {start, size} = detail || {};
        getCustomerList(start, size, userId);
    }

    renderTableBody() {
        const {detail} = this.props;
        const {list: customerList} = detail || {};
        return customerList.map(({id, memo, create_time, customer_name, customer_address, customer_tel}) => (
            <tr key={id}>
                <td className='item'>{id}</td>
                <td className='item'>{customer_name}</td>
                <td className='item'>{customer_tel}</td>
                <td className='item address'>{decodeURI(customer_address)}</td>
                <td className='item'>{memo}</td>
                <td className='item'>{moment(create_time).format('YYYY-MM-DD hh:mm')}</td>
            </tr>
        ))
    }

    renderLoadMore() {
        const {detail} = this.props;
        const {totalPages, start, loading} = detail || {};
        if (loading) {
            return (
                <div className='loading'>
                    <img src='images/spinner.gif'/>
                </div>
            );
        }
        if (totalPages > start) {
            return (
                <div className='load-more' onClick={() => this.getCustomerList()}>加载更多</div>
            );
        }
        return (
            <div className='no-more'>无更多</div>
        );
    }

    render() {
        return (
            <div className='customers'>
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th className='customer-id'>客户编号</th>
                        <th className='customer-name'>客户名称</th>
                        <th className='customer-tel'>客户电话</th>
                        <th className='customer-address'>客户地址</th>
                        <th className='customer-memo'>描述</th>
                        <th className='customer-time'>时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableBody()}
                    </tbody>
                </table>
                {this.renderLoadMore()}
            </div>
        )
    }
}