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
            .then((res)=> {
                console.log(res);
                const reList = res.list;
                const newList = [...list, ...reList];
                this.setState({
                    list: newList,
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

    searchByPhone() {
        const {phone} = this.state;
        if (!phone) {
            return;
        }
        this.setState({loading: true});
        fetch(`/user/${phone}`)
            .then((res)=> {
                const user = res.Result;
                const newList = [];
                if (!!user) {
                    newList.push(user);
                }
                this.setState({
                    list: newList,
                    totalPages: 0,
                    start: 0,
                    loading: false,
                });
            }).catch((err)=> {
                console.log(err);
                this.setState({
                    loading: false,
                });
            });
    }

    onKeyPress(e) {
        const keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.searchByPhone();
        }
    }

    renderSearch() {
        return (
            <div className='search-wrapper'>
                <div className='input-group'>
                    <input type='text' className='form-control' placeholder='请输入手机号码'
                           value={this.state.phone}
                           onKeyPress={(e) => this.onKeyPress(e)}
                           onChange={(e) => this.setState({phone: e.target.value})}/>
                    <span className='input-group-btn'>
                        <button className='btn btn-default' type='button'
                                onClick={() => this.searchByPhone()}>Search
                        </button>
                    </span>
                </div>
            </div>
        );
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
        if (loading) {
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
                {this.renderSearch()}
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
