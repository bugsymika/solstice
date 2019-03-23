import React, { Component } from 'react';
import './css/changecontent.css';
import axios from 'axios';
import ChangeStart from './ChangeStart';
import ChangeEnd from './ChangeEnd';
import { Link, Redirect } from 'react-router-dom';

export default class ChangeContent extends Component {
  state = {
    data: [],
    years: [],
    currentYear: null,
    startTF: false,
    endTF: false,
    redirect: false
  };

  componentDidMount() {
    axios.get('http://localhost:5000/data').then(response => {
      let rawData = response.data;
      rawData.forEach(element => {
        element.timeStamp =
          this.props.months[element.month] + ' ' + element.year;
        element.date = new Date(element.year, element.month - 1, 1);
        if (this.state.years.includes(element.year) === false) {
          this.setState({ years: [...this.state.years, element.year] });
        }
      });
      this.setState({ years: this.state.years.sort((a, b) => a - b) });
      this.setState({ currentYear: this.state.years.length - 1 });
      this.setState({ data: rawData.sort((a, b) => a.date - b.date) });
    });
  }

  yearDown = () => {
    this.setState({ currentYear: this.state.currentYear - 1 });
  };

  yearUp = () => {
    this.setState({ currentYear: this.state.currentYear + 1 });
  };

  changeRange = () => {
    this.setState({ startTF: !this.state.startTF });
    this.props.resetStartEnd();
  };

  startToggle = () => {
    this.setState({ startTF: !this.state.startTF });
  };

  endToggle = () => {
    if (this.state.endTF === false) {
      this.setState({ endTF: !this.state.endTF });
    } else {
      this.setState({ endTF: !this.state.endTF });
      this.setState({ redirect: !this.state.redirect });
    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />;
    } else {
      return (
        <React.Fragment>
          <header className='changeHeader'>
            <Link to='/'>
              <i className='icono-leftArrow' />
            </Link>

            <h1>Modify Graphs</h1>
          </header>

          <div className='container'>
            {this.state.startTF === false && this.state.endTF === false ? (
              <React.Fragment>
                <h2>
                  Currently displaying {this.props.start.timeStamp} to{' '}
                  {this.props.end.timeStamp}
                  <br />
                  <button onClick={this.changeRange}>Change?</button>
                </h2>
              </React.Fragment>
            ) : null}

            {this.state.startTF === true ? (
              <div className='changeContainer'>
                <ChangeStart
                  yearDown={this.yearDown}
                  currentYear={this.state.currentYear}
                  years={this.state.years}
                  yearUp={this.yearUp}
                  data={this.state.data}
                  months={this.props.months}
                  changeDate={this.props.changeStart}
                  start={this.props.start}
                  startToggle={this.startToggle}
                  endToggle={this.endToggle}
                  startTF={this.state.startTF}
                  endTF={this.state.endTF}
                />
              </div>
            ) : null}

            {this.state.startTF === false && this.state.endTF === true ? (
              <div className='changeContainer'>
                <ChangeEnd
                  yearDown={this.yearDown}
                  currentYear={this.state.currentYear}
                  years={this.state.years}
                  yearUp={this.yearUp}
                  data={this.state.data}
                  months={this.props.months}
                  changeDate={this.props.changeEnd}
                  start={this.props.start}
                  startToggle={this.startToggle}
                  endToggle={this.endToggle}
                  startTF={this.state.startTF}
                  endTF={this.state.endTF}
                />{' '}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      );
    }
  }
}
