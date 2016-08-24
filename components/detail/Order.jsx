/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
export default class Detail extends Component {

    constructor() {
        super();
        this.state = {
            start: 0,
            size: 10,
            totalPages: 0,
            orderList: [],
        }
    }

    componentDidMount() {
        this.getOrderList();
    }

    getOrderList() {
        const {start, size, orderList=[]} = this.state;
        const {userId} = this.props;
        let url = `/order/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        fetch(url)
            .then((res)=> {
                const reList = res.orderList;
                const newList = [...orderList, ...reList];
                this.setState({
                    orderList: newList,
                    totalPages: res.totalPages,
                    start: start + 1,
                });
            }).catch((err)=> {
                console.log(err);
            });
    }

    onOrderClick(id) {
        window.location.href = `/orderdetail.html?orderid=${id}`;
    }

    renderTableBody() {
        const {orderList} = this.state;
        return orderList.map(({id, memo, create_time, customer_id, customer_name, customer_tel, customer_address, status}) => (
            <tr key={id} onClick={() => this.onOrderClick(id)}>
                <td className='item'>{id}</td>
                <td className='item'>{customer_name}</td>
                <td className='item'>{customer_tel}</td>
                <td className='item'>{customer_address}</td>
                <td className='item'>{status}</td>
                <td className='item'>{memo}</td>
                <td className='item'>{moment(create_time).format('YYYY-MM-DD hh:mm')}</td>
            </tr>
        ))
    }

    renderLoadMore() {
        const {totalPages, start} = this.state;
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