import React, { Component } from 'react';
import { Button } from 'reactstrap';

export default class MonthButtons extends Component {
  dateChange = month => {
    if (this.props.startTF === true) {
      this.props.changeDate(month);
      this.props.startToggle();
      this.props.endToggle();
    }

    if (this.props.endTF === true) {
      this.props.changeDate(month);
      this.props.endToggle();
    } else {
      console.log('hi');
    }
  };

  testChange = start => {
    console.log(start);
  };

  render() {
    return this.props.monthsArray.map(month => {
      return (
        <Button
          key={month.date}
          color='primary'
          onClick={() => this.dateChange(month)}
          disabled={
            month.date < this.props.start.date ||
            (this.props.startTF === false &&
              month.date <= this.props.start.date)
          }
        >
          {this.props.months[month.month]}
        </Button>
      );
    });
  }
}
