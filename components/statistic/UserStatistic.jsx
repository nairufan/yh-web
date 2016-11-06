import React, { PropTypes, Component } from 'react';
import Avatar from './../common/Avatar';
import {fetch} from '../../utils/fetch';
import moment from 'moment';
import Chart from 'chart.js/src/chart.js'

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
        var ctx = document.getElementById("userChart");
        const labels = [];
        const dataSet = [];
        data.forEach(({date, count}) => {
            labels.push(date);
            dataSet.push(count);
        });
        var userChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "新增用户",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            },
        });
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
                <canvas id='userChart' width='400' height='400'></canvas>
            </div>
        )
    }
}
