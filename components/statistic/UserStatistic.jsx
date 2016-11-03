import React, { PropTypes, Component } from 'react';
import Avatar from './../common/Avatar';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
import d3 from 'd3';

const dayMillionSeconds = 24 * 60 * 60 * 1000;
export default class Users extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.getStatistics();
    }

    getStatistics() {
        const endDate = new Date().getTime();
        const startDate = endDate - 10 * dayMillionSeconds;
        console.log(new moment(startDate).format('YYYY-MM-DD'));
        console.log(new moment(endDate).format('YYYY-MM-DD'));
        let url = `/user/statistics?start=${startDate}&end=${endDate}`;
        this.setState({loading: true});
        fetch(url)
            .then((res)=> {
                console.log(res);
            }).catch((err)=> {
                console.log(err);
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        return (
            <div className='users'>
                user statistic
                <svg width='960' height='500'></svg>
            </div>
        )
    }
}
