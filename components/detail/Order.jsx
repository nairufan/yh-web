/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
export default class Detail extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.getOrderList();
    }

    getOrderList() {
        const {userId, getOrderList, detail} = this.props;
        const {start, size} = detail || {};
        getOrderList(start, size, userId);
    }

    onOrderClick(id) {
        window.location.href = `/orderdetail.html?orderid=${id}`;
    }

    renderTableBody() {
        const {detail} = this.props;
        const {list: orderList} = detail || {};
        return orderList.map(({id, memo, create_time, customer_id, customer_name, customer_tel, customer_address, status}) => (
            <tr key={id} onClick={() => this.onOrderClick(id)}>
                <td className='item'>{id}</td>
                <td className='item'>{customer_name}</td>
                <td className='item'>{customer_tel}</td>
                <td className='item'>{customer_address}</td>
                <td className='item'>{status === 1 ? '已发货' : '未发货'}</td>
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
                <div className='load-more' onClick={() => this.getOrderList()}>加载更多</div>
            );
        }
        return (
            <div className='no-more'>无更多</div>
        );
    }

    render() {
        return (
            <div className='orders'>
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th className='orderId'>订单编号</th>
                        <th className='name'>姓名</th>
                        <th className='tel'>联系电话</th>
                        <th className='address'>地址</th>
                        <th className='status'>订单状态</th>
                        <th className='memo'>备注</th>
                        <th className='time'>时间</th>
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