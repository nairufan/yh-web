import React, { Component, PropTypes } from 'react';

import Header from '../common/Header';
import Users from '../home/Users';
import Order from './Order';
import Category from './Category';
import Goods from './Goods';
import Customer from './Customer';

import '../../less/detail.less';

const tabs = [
    {key: 'order', value: '订单'},
    {key: 'category', value: '分类'},
    {key: 'goods', value: '商品'},
    {key: 'customer', value: '客户'},
];

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            tab: tabs[0].key,
        }
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    renderNav() {
        const {tab} = this.state;
        return (
            <ul>
                {
                    tabs.map(({key, value}) => (
                        <li key={key}
                            className={(key === tab) && 'active'}
                            onClick={() => this.setState({tab: key})}>{value}</li>
                    ))
                }
            </ul>
        );
    }

    render() {
        const {tab} = this.state;
        let userId = this.getParameterByName('userId');
        let childComponent;
        switch (tab) {
            case 'order':
                childComponent = <Order userId={userId}/>;
                break;
            case 'category':
                childComponent = <Category userId={userId}/>;
                break;
            case 'goods':
                childComponent = <Goods userId={userId}/>;
                break;
            case 'customer':
                childComponent = <Customer userId={userId}/>;
                break;
            default:
                childComponent = <Order userId={userId}/>;
        }
        return (
            <div>
                <Header title='详细'/>

                <div className='main-body detail'>
                    <div className='nav-bar'>
                        {this.renderNav()}
                    </div>
                    <div className='content'>
                        {childComponent}
                    </div>
                </div>
            </div>
        )
    }
}
