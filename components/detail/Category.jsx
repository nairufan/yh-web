/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Category extends Component {

    constructor() {
        super();
        this.state = {
            start: 0,
            size: 10,
            totalPages: 0,
            categoryList: [],
        }
    }

    componentDidMount() {
        this.getCategoryList();
    }

    getCategoryList() {
        const {userId, getCategoryList, detail} = this.props;
        const {start, size} = detail || {};
        getCategoryList(start, size, userId);
    }

    renderTableBody() {
        const {detail} = this.props;
        const {list: categoryList} = detail || {};
        return categoryList.map(({id, memo, create_time, name}) => (
            <tr key={id}>
                <td className='item'>{id}</td>
                <td className='item'>{name}</td>
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
                <div className='load-more' onClick={() => this.getCategoryList()}>加载更多</div>
            );
        }
        return (
            <div className='no-more'>无更多</div>
        );
    }

    render() {
        return (
            <div className='categories'>
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th className='category-id'>分类编号</th>
                        <th className='category-name'>分类名称</th>
                        <th className='category-memo'>描述</th>
                        <th className='category-time'>时间</th>
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