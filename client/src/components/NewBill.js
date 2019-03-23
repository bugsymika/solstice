import React, { Component } from 'react';
import MonthSelect from './MonthSelect';
import axios from 'axios';
import './css/newbill.css';
export default class NewBill extends Component {
  state = {
    year: 0,
    month: null,
    khw: null,
    bill: null,
    savings: null,
    sending: false,
    redirect: false,
    rawData: [],
    validationError: false
  };

  componentDidMount() {
    this.getData();
  }

  setYear = async e => {
    this.setState({ year: Number(e.target.value) });
  };

  setMonth = e => {
    this.setState({ month: Number(e.target.value) });
  };

  setKwh = e => {
    this.setState({ kwh: Number(e.target.value) });
  };

  setBill = e => {
    this.setState({ bill: Number(e.target.value) });
  };

  setSavings = e => {
    this.setState({ savings: Number(e.target.value) });
  };

  getData = async () => {
    axios.get('http://localhost:5000/data').then(response => {
      this.setState({ rawData: response.data });
    });
  };

  submit = async () => {
    if (
      this.state.year !== 0 &&
      this.state.month != null &&
      typeof this.state.kwh === 'number' &&
      this.state.kwh >= 0 &&
      typeof this.state.savings === 'number' &&
      this.state.savings >= 0 &&
      typeof this.state.bill === 'number' &&
      this.state.bill >= 0
    ) {
      await axios.post('http://localhost:5000/data', {
        year: this.state.year,
        month: this.state.month,
        kwh: this.state.kwh,
        bill: this.state.bill,
        savings: this.state.savings
      });

      this.props.addNewBill();
    } else {
      this.setState({ validationError: true });
    }
  };

  render() {
    return (
      <div className='container'>
        <div className='pointer' onClick={this.props.addNewBill}>
          {' '}
          <i className='icono-leftArrow' />
        </div>
        <h1>Add a new bill</h1>
        <div className='formContainer'>
          <form onSubmit={this.submit}>
            <label>Year:</label>
            <select onChange={this.setYear}>
              <option disabled selected value>
                {' '}
                -- select an option --{' '}
              </option>
              <option value={2010}>2010</option>
              <option value={2011}>2011</option>
              <option value={2012}>2012</option>
              <option value={2013}>2013</option>
              <option value={2014}>2014</option>
              <option value={2015}>2015</option>
              <option value={2016}>2016</option>
              <option value={2017}>2017</option>
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
            </select>
            <br />

            {this.state.year !== 0 && (
              <React.Fragment>
                <label>Month:</label>
                <select onChange={this.setMonth}>
                  <option option disabled selected value>
                    -- select an option --
                  </option>

                  <MonthSelect
                    year={this.state.year}
                    months={this.props.months}
                    monthNumbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    dataSet={this.state.rawData.filter(
                      element => element.year === this.state.year
                    )}
                  />
                </select>
                <br />
              </React.Fragment>
            )}

            {this.state.month !== null && (
              <React.Fragment>
                <label>KWH:</label>
                <input type='text' onChange={this.setKwh} />
                <br />
                <label>Bill:</label>
                <input type='text' onChange={this.setBill} />
                <br />
                <label>Savings:</label>
                <input type='text' onChange={this.setSavings} />

                <br />
                <button onClick={this.submit}>Submit</button>

                {this.state.validationError && (
                  <p>Validation error detected, please try again</p>
                )}
              </React.Fragment>
            )}
          </form>
        </div>
      </div>
    );
  }
}
