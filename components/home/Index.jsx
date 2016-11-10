import React, { Component, PropTypes } from 'react';
import Header from '../common/Header';
import Users from './Users';
import '../../less/main.less';
import { connect } from 'react-redux';
import { getUserList, getUserByPhone, onError } from '../../actions/UserAction';

class Index extends Component {
    render() {
        const {home, dispatch} = this.props;
        return (
        <div>
            <Header title='用户'/>
            <div className='main-body'>
                <Users data={home}
                       getUserList={(start, size) => dispatch(getUserList(start, size))}
                       getUserByPhone={(phone) => dispatch(getUserByPhone(phone))}/>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {home: state.home};
}
export default connect(mapStateToProps)(Index);