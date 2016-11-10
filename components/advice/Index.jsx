import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import update from 'react-addons-update';
import Header from '../common/Header';
import {fetch} from '../../utils/fetch';
import '../../less/advice.less';
import { connect } from 'react-redux';
import { getAdvice, changeTab , markResolve} from '../../actions/AdviceAction';

const tabs = [
    {key: '-1', value: '所有'},
    {key: '0', value: '未解决'},
    {key: '1', value: '已解决'},
];

class Index extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.getAdviceList();
    }

    getAdviceList() {
        const {advice, dispatch} = this.props;
        const {start, size, tab} = advice || {};
        dispatch(getAdvice(start, size, tab));
    }

    onResole(id) {
        const {dispatch} = this.props;
        dispatch(markResolve(id));
    }

    onTabChange(status) {
        const {advice, dispatch} = this.props;
        const {tab} = advice || {};
        if (status !== tab) {
            dispatch(changeTab(status));
            dispatch(getAdvice(0, 10, status));
        }
    }

    renderNav() {
        const {advice} = this.props;
        const {tab} = advice || {};
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
        const {advice} = this.props;
        const {list, userMap} = advice || {};
        return list.map(({id, user_id_str, content, create_time, status}) => (
            <tr key={id}>
                <td className='item'>{userMap[user_id_str] && userMap[user_id_str].tel}</td>
                <td className='item'>{content}</td>
                <td className='item'>{moment(create_time).format('YYYY-MM-DD hh:mm')}</td>
                <td className='item'>{this.renderStatus(id, status)}</td>
            </tr>
        ))
    }

    renderLoadMore() {
        const {advice} = this.props;
        const {totalPages, start, loading} = advice || {};
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

function mapStateToProps(state) {
    return {advice: state.advice};
}
export default connect(mapStateToProps)(Index);
