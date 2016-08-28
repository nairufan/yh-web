/**
 * Created by fannairu on 2016/8/14.
 */
import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
export default class Goods extends Component {

    constructor() {
        super();
        this.state = {
            start: 0,
            size: 10,
            totalPages: 0,
            goodsList: [],
            categoryMap: {},
        }
    }

    componentDidMount() {
        this.getCategoryList();
    }

    getCategoryList() {
        const {start, size, goodsList=[]} = this.state;
        const {userId} = this.props;
        let url = `/goods/list?start=${start}&size=${size}`;
        if (userId) {
            url += `&userId=${userId}`;
        }
        this.setState({loading: true});
        fetch(url)
            .then((res)=> {
                const reList = res.goodsList;
                const newList = [...goodsList, ...reList];
                this.setState({
                    goodsList: newList,
                    categoryMap: res.categoryMap,
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
        const {goodsList, categoryMap} = this.state;
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