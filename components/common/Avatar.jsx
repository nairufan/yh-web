import React, { PropTypes, Component } from 'react'
import '../../less/components/avatar.less';

export default class Avatar extends Component {

    constructor() {
        super();
    }
    render() {
        const {user: {username, avatar}, className, type} = this.props;
        let sizeClass = type ? `size-${type}` : 'size-m';
        if (avatar) {
            return <div className={`${className} avatar ${sizeClass}`} style={{backgroundImage: `url(${avatar})`}}/>
        }
        return (
            <div className={`${className} avatar ${sizeClass}`}>{username && username.substring(0, 1)}</div>
        );
    }
}
