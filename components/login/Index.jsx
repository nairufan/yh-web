import React, { Component, PropTypes } from 'react';
import {fetch} from '../../utils/fetch';
import '../../less/login.less';

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            tel: '',
            password: '',
            error: null,
        }
    }

    login() {
        const {tel, password} = this.state;
        if (!tel || !password) {
            this.setState({
                error: 'telephone or password must not null.',
            });
            return;
        }
        this.setState({loading: true});
        const data = {tel, password};
        fetch('/user/loginWithPassword', JSON.stringify(data), 'POST')
            .then((res)=> {
                if (!res.ERROR_CODE) {
                    window.location.href='/index.html';
                }
                this.setState({
                    error: res.ERROR_CODE,
                    loading: false,
                });
                console.log(res);
            }).catch((err)=> {
                console.log(err);
                this.setState({
                    loading: false,
                    error: error,
                });
            });
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
        const {tel, password, error, loading} = this.state;
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
                            onClick={() => this.login()}>Login</button>
                </form>
            </div>
        )
    }
}
