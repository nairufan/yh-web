/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
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
        const {start, size, categoryList=[]} = this.state;
        const {userId} = this.props;
        let url = `/category/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        this.setState({loading: true});
        fetch(url)
            .then((res)=> {
                const reList = res.categoryList;
                const newList = [...categoryList, ...reList];
                this.setState({
                    categoryList: newList,
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
        const {categoryList} = this.state;
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