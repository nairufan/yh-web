
import React, { PropTypes, Component } from 'react'
import Avatar from './Avatar';
const menus = [
    {title: '用户', link: '/index.html'},
    {title: '详细', link: '/detail.html'},
    //{title: '统计', link: '/static.html'},
    {title: '反馈', link: '/advice.html'},
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

    renderUserInfo() {
        const {username, avatar} = mockUser;
        if (avatar) {
            return <div className='avatar' style={{backgroundImage: `url(${avatar})`}}/>
        }
        return (
            <div className='avatar'>{username.substring(0, 1)}</div>
        );
    }

    render() {
        return (
            <div className='header'>
                <div className='content'>
                    <div>{this.renderMenus()}</div>
                    <Avatar user={mockUser}/>
                </div>
            </div>
        )
    }
}

const mockUser = {username: 'Fannairu', avatar: 'https://dzamqefpotdvf.cloudfront.net/07df92ac-ea32-4fc7-819d-b06cc9c211c6'};
