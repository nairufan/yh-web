/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
export default class Customer extends Component {

    constructor() {
        super();
        this.state = {
            start: 0,
            size: 10,
            totalPages: 0,
            customerList: [],
        }
    }

    componentDidMount() {
        this.getCustomerList();
    }

    getCustomerList() {
        const {start, size, customerList=[]} = this.state;
        const {userId} = this.props;
        let url = `/customer/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        this.setState({loading: true});
        fetch(url)
            .then((res)=> {
                const reList = res.customerList;
                const newList = [...customerList, ...reList];
                this.setState({
                    customerList: newList,
                    totalPages: res.totalPages,
                    start: start + 1,
                    loading: false,
                });
            }).catch((err)=> {
                console.log(err);
                this.setState({
                    loading: false,
                });
            });
    }

    renderTableBody() {
        const {customerList} = this.state;
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
        const {totalPages, start, loading} = this.state;
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