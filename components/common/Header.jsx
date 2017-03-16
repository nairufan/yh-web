
import React, { PropTypes, Component } from 'react'
import Avatar from './Avatar';
const menus = [
    {title: '统计', link: '/statistic.html'},
    {title: '小程序', link: '/weixin.html'},
];
export default class Header extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    renderMenus() {
        const {title: t} = this.props;
        return menus.map(({title, link}) => (
            <a href={link}
               key={title}
               className={`menu ${t === title && 'active'}`}>{title}</a>
        ));
    }

    render() {
        return (
            <div className='header'>
                <div className='content'>
                    <div>{this.renderMenus()}</div>
                </div>
            </div>
        )
    }
}