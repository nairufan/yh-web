import React, { PropTypes, Component } from 'react';
import Chart from 'chart.js/src/chart.js'
import {getChartOption} from '../../utils/chartOption';

const dayMillionSeconds = 24 * 60 * 60 * 1000;

export default class ExpressStatistic extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.getStatistics();
    }

    componentDidUpdate() {
        const {statistic} = this.props;
        const {expressData} = statistic || {};
        if (expressData && expressData.length > 0) {
            this.renderChart(expressData);
        }
    }

    renderChart(data) {
        var ctx = document.getElementById("expressChart");
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
                        label: '新增查询',
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
        const {statistic} = this.props;
        const {expressTotal} = statistic || {};
        return (
            <div className='user-statistic'>
                <div className='total'>查询总数：{expressTotal || 0}</div>
                <div className='canvas-wrapper'>
                    <canvas id='expressChart' style={{width: 600, height: 400}}></canvas>
                </div>
            </div>
        )
    }
}
