import React, { Component, PropTypes } from 'react';
import '../../less/login.less';
import { connect } from 'react-redux';
import { login, onError } from '../../actions/LoginAction';

class Index extends Component {
    constructor() {
        super();
        this.state = {
            tel: '',
            password: '',
        }
    }

    login() {
        const {tel, password} = this.state;
        const {dispatch} = this.props;
        if (!tel || !password) {
            dispatch(onError('telephone or password must not null.'));
            return;
        }
        dispatch(login(tel, password));
    }

    renderError(error) {
        return (
            <div className='alert alert-danger alert-dismissible' role='alert'>
                <button type='button' className='close' onClick={() => this.setState({error: null})}>
                    <span aria-hidden='true'>&times;</span>
                </button>
                <strong>Tips!</strong>{error}
            </div>
        );
    }

    render() {
        const {login} = this.props;
        const {tel, password} = this.state;
        const {error, loading} = login || {};
        return (
            <div className='login'>
                {error && this.renderError(error)}
                <form>
                    <div className='form-group'>
                        <label for='exampleInputEmail1'>Telephone Number</label>
                        <input type='text'
                               className='form-control'
                               placeholder='telephone number'
                               value={tel}
                               onChange={(e) => this.setState({tel: e.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label for='exampleInputPassword1'>Password</label>
                        <input type='password'
                               className='form-control'
                               placeholder='password'
                               value={password}
                               onChange={(e) => this.setState({password: e.target.value})}/>
                    </div>
                    <button className='btn btn-primary'
                            type='button'
                            disabled={loading}
                            onClick={() => this.login()}>Login
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {login: state.login};
}
export default connect(mapStateToProps)(Index);