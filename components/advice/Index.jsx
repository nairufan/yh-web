import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import update from 'react-addons-update';
import Header from '../common/Header';
import {fetch} from '../../utils/fetch';
import '../../less/advice.less';

const tabs = [
    {key: '-1', value: '所有'},
    {key: '0', value: '未解决'},
    {key: '1', value: '已解决'},
];

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            tab: tabs[0].key,
            list: [],
            userMap: {},
            start: 0,
            size: 10,
        }
    }

    componentDidMount() {
        this.getAdviceList();
    }

    getAdviceList() {
        const {start, size, list=[], userMap={}, tab} = this.state;
        let url = `/advice/list?start=${start}&size=${size}&status=${tab}`;
        this.setState({loading: true});
        fetch(url)
            .then((res)=> {
                const reList = res.list;
                const newList = [...list, ...reList];
                const reUserMap = res.userMap;
                const newUserMap = {...reUserMap, ...userMap};
                this.setState({
                    list: newList,
                    userMap: newUserMap,
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

    onResole(id) {
        fetch(`/advice/resolve/${id}`, {}, 'POST')
            .then((res)=>{
                if (res.Result === 'SUCCESS') {
                    const {list} = this.state;
                    const index = list.findIndex(({id: itemId}) => id === itemId);
                    if (index >= 0) {
                        const newList = update(list,{
                            [index]: {
                                status: {
                                    $set: 1,
                                },
                            },
                        });
                        this.setState({list: newList});
                    }
                }
            }).catch((err)=>{
                console.log(err);
            });
    }

    onTabChange(status) {
        const {tab} = this.state;
        if (status !== tab) {
            this.setState({
                tab: status,
                list: [],
                userMap: {},
                start: 0,
                size: 10,
            }, () => this.getAdviceList());
        }
    }

    renderNav() {
        const {tab} = this.state;
        return (
            <ul>
                {
                    tabs.map(({key, value}) => (
                        <li key={key}
                            className={(key === tab) && 'active'}
                            onClick={() => this.onTabChange(key)}>{value}</li>
                    ))
                }
            </ul>
        );
    }

    renderStatus(id, status) {
        if (!status || status === 0) {
            return (
                <span className='check' onClick={() => this.onResole(id)}/>
            );
        }
        return (
            <img src='images/checkmark.png' className='checked'/>
        );
    }

    renderTableBody() {
        const {list, userMap} = this.state;
        return list.map(({id, userId, content, create_time, status}) => (
            <tr key={id}>
                <td className='item'>{userMap[userId] && userMap[userId].tel}</td>
                <td className='item'>{content}</td>
                <td className='item'>{moment(create_time).format('YYYY-MM-DD hh:mm')}</td>
                <td className='item'>{this.renderStatus(id, status)}</td>
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
                <div className='load-more' onClick={() => this.getAdviceList()}>加载更多</div>
            );
        }
        return (
            <div className='no-more'>无更多</div>
        );
    }

    render() {
        return (
            <div>
                <Header title='反馈'/>

                <div className='main-body advice'>
                    <div className='nav-bar'>
                        {this.renderNav()}
                    </div>
                    <div className='content'>
                        <table className='table table-hover'>
                            <thead>
                            <tr>
                                <th className='advice-tel'>用户手机</th>
                                <th className='advice-content'>描述建议</th>
                                <th className='advice-time'>时间</th>
                                <th className='advice-status'>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTableBody()}
                            </tbody>
                        </table>
                        {this.renderLoadMore()}
                    </div>
                </div>
            </div>
        )
    }
}
