/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
export default class Goods extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.getGoodsList();
    }

    getGoodsList() {
        const {userId, getGoodsList, detail} = this.props;
        const {start, size} = detail || {};
        getGoodsList(start, size, userId);
    }

    renderTableBody() {
        const {detail} = this.props;
        const {list: goodsList, categoryMap} = detail || {};
        return goodsList.map(({id, memo, create_time, product_name, category_id}) => (
            <tr key={id}>
                <td className='item'>{id}</td>
                <td className='item'>{product_name}</td>
                <td className='item'>{memo}</td>
                <td className='item'>{categoryMap && categoryMap[category_id].name}</td>
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
                <div className='load-more' onClick={() => this.getGoodsList()}>加载更多</div>
            );
        }
        return (
            <div className='no-more'>无更多</div>
        );
    }

    render() {
        return (
            <div className='goods'>
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th className='goods-id'>商品编号</th>
                        <th className='goods-name'>商品名称</th>
                        <th className='goods-memo'>描述</th>
                        <th className='goods-category'>分类</th>
                        <th className='goods-time'>时间</th>
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