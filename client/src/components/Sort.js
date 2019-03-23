import React, { Component } from 'react';
import './css/sort.css';
export default class Sort extends Component {
  state = { value: 'date' };

  changeValue = e => {
    this.props.changeSortValue(e.target.value);
    this.props.sort(e.target.value);
  };

  render() {
    return (
      <div>
        Sort By:
        <select class='sortBar' onChange={this.changeValue}>
          <option value='date'>Date (default)</option>
          <option value='kwh'>KWH</option>
          <option value='bill'>Energy Bill</option>
          <option value='savings'>Savings</option>
        </select>
      </div>
    );
  }
}
