import React, { PropTypes, Component } from 'react';
import Chart from 'chart.js/src/chart.js'
import {getChartOption} from '../../utils/chartOption';

const dayMillionSeconds = 24 * 60 * 60 * 1000;

export default class Statistic extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.getStatistics();
    }

    componentDidUpdate() {
        const {statistic} = this.props;
        const {data} = statistic || {};
        if (data && data.length > 0) {
            this.renderChart(data);
        }
    }

    renderChart(data) {
        const {id, label} = this.props;
        var ctx = document.getElementById(id);
        const labels = [];
        const dataSet = [];
        data.forEach(({date, count}) => {
            labels.push(date);
            dataSet.push(count);
        });
        const option = getChartOption();
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        ...option,
                        label: label,
                        data: dataSet,
                    }
                ]
            },
        });
    }

    getStatistics() {
        const endDate = new Date().getTime();
        const startDate = endDate - 10 * dayMillionSeconds;
        this.props.getStatistic(startDate, endDate);
    }

    render() {
        const {title, statistic, id} = this.props;
        const {total} = statistic || {};
        return (
            <div className='user-statistic'>
                <div className='total'>{title}：{total || 0}</div>
                <div className='canvas-wrapper'>
                    <canvas id={id} style={{width: 600, height: 400}}></canvas>
                </div>
            </div>
        )
    }
}
