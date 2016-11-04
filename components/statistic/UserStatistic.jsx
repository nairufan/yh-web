import React, { PropTypes, Component } from 'react';
import Avatar from './../common/Avatar';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
import Chart from 'src/chart.js'
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

    componentDidUpdate() {
        const {data} = this.state;
        if (data && data.length > 0) {
            this.renderChart(data);
        }
        console.log(this.state);
    }

    renderChart(data) {

    }
    getStatistics() {
        const endDate = new Date().getTime();
        const startDate = endDate - 10 * dayMillionSeconds;
        const data = [];
        let tmpDate = startDate;
        while (tmpDate <= endDate) {
            data.push({
                date: new moment(tmpDate).format('YYYY-MM-DD'),
            });
            tmpDate += dayMillionSeconds;
        }
        let url = `/user/statistics?start=${startDate}&end=${endDate}`;
        this.setState({loading: true});
        fetch(url)
            .then((res)=> {
                const total = res.total;
                const statistics = res.statistics;
                for (let i = 0; i< data.length ;i ++) {
                    const {date} = data[i];
                    data[i].count = (statistics[date] && statistics[date]) || 0;
                }
                this.setState({
                    loading: false,
                    total,
                    data,
                });
                console.log();
            }).catch((err)=> {
                console.log(err);
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        const {total} = this.state;
        return (
            <div className='user-statistic'>
                <div className='total'>总用户数：{total || 0}</div>
                <canvas id='myChart' width='400" height="400"></canvas>
            </div>
        )
    }
}
