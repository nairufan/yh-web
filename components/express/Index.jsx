import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import {getItem, setItem, removeItem} from '../../utils/storage';
import '../../less/express.less';
const key = 'express_codes';

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            val: '',
            showHistory: false,
            loading: false,
            expressCodes: (getItem(key) && JSON.parse(getItem(key))) || [],
        }
    }

    onKeyPress(e) {
        const keyNum = e.keyCode || e.which;
        if (keyNum === 13) {
            this.search();
        }
    }

    pushStorage(code) {
        let {expressCodes} = this.state;
        const newExpressCodes = [...expressCodes];
        if (newExpressCodes.length > 0) {
            let index = -1;
            for (let i = 0; i < newExpressCodes.length; i++) {
                if (newExpressCodes[i] === code) {
                    index = i;
                }
            }
            if (index >= 0) {
                newExpressCodes.splice(index, 1);
            }
        }
        newExpressCodes.unshift(code);
        if (newExpressCodes.length > 4) {
            newExpressCodes.splice(4, 1);
        }
        this.setState({expressCodes: newExpressCodes});
        setItem(key, newExpressCodes);
    }

    search() {
        const {val} = this.state;
        if (!val) {
            return;
        }
        this.pushStorage(val);
        let url = `/express/shipper/${val}`;
        this.setState({loading: true});
        const callbackurl = 'http://you365.me/express.html';
        fetch(url)
            .then((res)=> {
                window.location.href = `http://m.kuaidi100.com/index_all.html?type=${res.code}&postid=${val}&callbackurl=${callbackurl}`;
            }).catch((err)=> {
                console.log('Error:', err);
                window.location.href = `http://m.kuaidi100.com/index_all.html?postid=${val}&callbackurl=${callbackurl}`;
            });
    }

    onSelect(code) {
        this.setState({val: code}, this.search);
    }

    clear() {
        this.setState({expressCodes: []});
        removeItem(key);
    }

    renderHistory(expressCodes) {
        let list = [];
        if (expressCodes) {
            list = JSON.parse(expressCodes).map((code) => (
                <a className='item' onClick={() => this.onSelect(code)}>{code}</a>
            ));
        }
        return (
            <div className='list'>
                {list}
                <a className='item'
                   onClick={() => this.clear()}>{'清除搜索记录'}</a>
            </div>
        );
    }

    render() {
        const {val, loading, showHistory} = this.state;
        let button = (
            <img src='images/search.png'
                 className='search'
                 onClick={() => this.search()}/>
        );
        if (loading) {
            button = (
                <img src='images/spinner.gif'
                     className='search loading'/>
            );
        }
        return (
            <div className='wrapper'>
                <div className='content-wrapper'>
                    <div className='logo-wrapper'>
                        <img src='images/youji-logo.png' className='logo'/>
                    </div>
                    <div className='input-wrapper'>
                        <div className='input-content'>
                            <input type='text' className='input'
                                   value={val}
                                   onChange={(e) => this.setState({val: e.target.value})}
                                   onFocus={() => this.setState({showHistory: true})}
                                   onKeyPress={(e) => this.onKeyPress(e)}/>
                        </div>
                        {button}
                        {!val && showHistory && this.renderHistory(getItem(key))}
                    </div>
                </div>
            </div>
        );
    }
}