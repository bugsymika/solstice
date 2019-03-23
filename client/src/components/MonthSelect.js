import React, { Component } from 'react';

export default class MonthSelect extends Component {
  render() {
    return this.props.monthNumbers
      .filter(
        month =>
          this.props.dataSet.map(element => element.month).includes(month) ===
          false
      )
      .map(month => {
        return (
          <option value={month} key={this.props.months[month]}>
            {this.props.months[month]}
          </option>
        );
      });
  }
}
