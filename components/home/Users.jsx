import React, { PropTypes, Component } from 'react';
import Avatar from './../common/Avatar';
import {fetch} from '../../utils/fetch';
import moment from 'moment';

const baseUrl = 'http://localhost/api';
export default class Users extends Component {

    constructor() {
        super();
        this.state = {
            start: 0,
            size: 10,
            itemsShow: {},
            "totalPages": 0,
            "list": [],
        }
    }

    toggleItemsShow(id, show) {
        const {itemsShow} = this.state;
        const newItemsShow = {...itemsShow};
        newItemsShow[id] = show;
        this.setState({itemsShow: newItemsShow});
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        const {start, size, list =[]} = this.state;
        this.setState({loading: true});
        fetch(`/user/list?start=${start}&size=${size}`)
            .then((res)=>{
                const reList = res.list;
                const newList = [...list, ...reList];
                this.setState({
                    list: newList,
                    totalPages: res.totalPages,
                    start: start + 1,
                    loading: false,
                });
            }).catch((err)=>{
                console.log(err);
                this.setState({
                    loading: false,
                });
            });
    }

    renderTableBody() {
        const {list} = this.state;
        if (!list) {
            return null;
        }
        return list.map(({id, tel, create_time, username}) => (
            <tr key={id}>
                <td className='item'>{username}</td>
                <td className='item'>{tel}</td>
                <td className='item'>{moment(create_time).format('YYYY-MM-DD hh:mm')}</td>
                <td className='item'>
                    <div className='actions'>
                        <a href={`/detail.html?userId=${id}`}>详细</a>
                        <a href={`/detail.html?userId=${id}`}>统计</a>
                    </div>
                </td>
            </tr>
        ))
    }

    renderLoadMore() {
        const {totalPages, start, loading} = this.state;
        if (true) {
            return (
                <div className='loading'>
                    <img src='images/spinner.gif'/>
                </div>
            );
        }
        if (totalPages > start) {
            return (
                <div className='load-more' onClick={() => this.getUserList()}>加载更多</div>
            );
        }
        return (
            <div className='no-more'>无更多</div>
        );
    }

    render() {
        return (
            <div className='users'>
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th className='user-name'>用户名称</th>
                        <th className='user-tel'>用户电话</th>
                        <th className='user-time'>创建时间</th>
                        <th className='user-time'>操作</th>
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
