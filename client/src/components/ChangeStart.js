import React, { Component } from 'react';
import MonthButtons from './MonthButtons';

export default class ChangeStart extends Component {
  render() {
    return (
      <div>
        <div className='head'>Select Start Date</div>
        <div className='yearSelect'>
          <button
            onClick={this.props.yearDown}
            disabled={this.props.currentYear === 0}
          >
            -
          </button>
          {this.props.years[this.props.currentYear]}
          <button
            onClick={this.props.yearUp}
            disabled={this.props.currentYear === this.props.years.length - 1}
          >
            +
          </button>
        </div>
        <div className='monthSelect'>
          <MonthButtons
            monthsArray={this.props.data.filter(
              element =>
                element.year === this.props.years[this.props.currentYear]
            )}
            months={this.props.months}
            changeDate={this.props.changeDate}
            start={this.props.start}
            startToggle={this.props.startToggle}
            endToggle={this.props.endToggle}
            startTF={this.props.startTF}
            endTF={this.props.endTF}
          />{' '}
          <div />
        </div>
      </div>
    );
  }
}
