import React, { Component } from 'react';
import MonthButtons from './MonthButtons';

export default class ChangeEnd extends Component {
  render() {
    return (
      <div>
        <div className='head'>Select End Date</div>
        <div className='yearSelect'>
          <button
            onClick={this.props.yearDown}
            disabled={
              this.props.currentYear === 0 ||
              this.props.years[this.props.currentYear - 1] <
                this.props.start.year
            }
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
            start={this.props.start}
            changeDate={this.props.changeDate}
            startToggle={this.props.startToggle}
            endToggle={this.props.endToggle}
            startTF={this.props.startTF}
            endTF={this.props.endTF}
          />{' '}
        </div>
        <div />
      </div>
    );
  }
}
