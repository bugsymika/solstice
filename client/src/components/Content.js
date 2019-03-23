import React, { Component } from 'react';
import './css/content.css';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default class Content extends Component {
  deleteBill = id => {
    return axios.delete(`${'http://localhost:5000/data'}${id}`);
  };

  render() {
    return (
      <div className='content'>
        <div>
          <h1>Your Energy Bill Visualized</h1>
        </div>
        <ResponsiveContainer width='100%' height='80%' className='chart'>
          <BarChart
            data={this.props.data.filter(
              data =>
                data.date >= this.props.start.date &&
                data.date <= this.props.end.date
            )}
          >
            <CartesianGrid strokeDasharray='1 1' />
            <XAxis dataKey='timeStamp' />
            <Tooltip />
            <Legend color='white' />

            {this.props.kwh && (
              <YAxis yAxisId='left' orientation='left' stroke='#e22954' />
            )}

            {this.props.kwh && (
              <Bar
                yAxisId='left'
                dataKey='kwh'
                fill='#e22954'
                unit=' Hours'
                maxBarSize={80}
                onClick={this.hi}
              />
            )}

            <YAxis yAxisId='right' orientation='right' stroke='#2a58e2' />

            {this.props.bill && (
              <Bar
                yAxisId='right'
                stackId='a'
                dataKey='bill'
                unit=' USD'
                fill='#2a58e2'
                maxBarSize={80}
                onClick={this.hi}
              />
            )}

            {this.props.savings && (
              <Bar
                yAxisId='right'
                stackId='a'
                dataKey='savings'
                fill='#2be24c '
                unit=' USD'
                maxBarSize={80}
                onClick={this.hi}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
        <div className='footer' />
      </div>
    );
  }
}
