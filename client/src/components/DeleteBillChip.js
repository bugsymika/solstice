import React, { Component } from 'react';
import './css/deletechip.css';
import axios from 'axios';
export default class DeleteBillChip extends Component {
  deleteData = async (id, object) => {
    const url = '/data/' + id;
    await axios.delete(url);
    await this.props.pushToFilter(object);
    this.props.toggleDel();
    this.props.deleteBillOpen();
  };

  render() {
    return this.props.data.map(month => {
      return (
        <div
          className='deleteChip'
          onClick={() => this.deleteData(month._id, month)}
          key={month.date}
        >
          {month.timeStamp} <br />
          <div className='monthData'>
            <span className='red'>{month.kwh} Hours</span>{' '}
            <span className='blue'>${month.bill}</span>
            <span className='green'>${month.savings}</span>
          </div>
        </div>
      );
    });
  }
}
