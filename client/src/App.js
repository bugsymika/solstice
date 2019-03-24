import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import ChangeContent from './components/ChangeContent';
import NewBill from './components/NewBill';
import DeleteBill from './components/DeleteBill';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  state = {
    rawData: [],
    data: [],
    selected: [],
    months: [
      null,
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],

    start: {},
    end: {},
    kwh: true,
    bill: true,
    savings: true,
    sort: 'date',
    newBillOpen: false,
    deleteBillOpen: false
  };

  componentDidMount() {
    this.getData();
  }

  addNewBill = () => {
    this.setState({ newBillOpen: !this.state.newBillOpen });
  };

  pushNewBill = array => {
    this.setState({ data: [...this.state.data, array] });
  };

  getData = async () => {
    axios.get('/data').then(response => {
      let rawData = response.data;
      rawData.forEach(element => {
        element.timeStamp =
          this.state.months[element.month] + ' ' + element.year;
        element.date = new Date(element.year, element.month - 1, 1);
      });
      rawData = rawData.sort((a, b) => a.date - b.date);
      this.setState({ rawData: rawData });
      this.setState({ data: this.state.rawData });
      this.setState({ start: rawData[0] });
      this.setState({ end: rawData[rawData.length - 1] });
      this.setState({ high: rawData[0] });
      this.setState({ low: rawData[rawData.length - 1] });
    });
  };

  sortByDate = async () => {
    await this.setState({ data: [] });
    this.setState({ data: this.state.rawData.sort((a, b) => a.date - b.date) });
  };

  sortByKwh = async () => {
    await this.setState({ data: [] });
    this.setState({
      data: this.state.rawData.sort((a, b) => a.kwh - b.kwh)
    });
  };

  sortByBill = async () => {
    await this.setState({ data: [] });
    this.setState({ data: this.state.rawData.sort((a, b) => a.bill - b.bill) });
  };

  sortBySavings = async () => {
    await this.setState({ data: [] });
    this.setState({
      data: this.state.rawData.sort((a, b) => a.savings - b.savings)
    });
  };

  reverse = async () => {
    const originalArray = this.state.data;
    await this.setState({ data: [] });
    this.setState({ data: originalArray.reverse() });
  };

  changeStart = date => {
    this.setState({ start: date });
  };
  changeEnd = date => {
    this.setState({ end: date });
  };

  resetStartEnd = () => {
    this.setState({ start: this.state.rawData[0] });
    this.setState({ end: this.state.rawData[this.state.rawData.length - 1] });
  };

  toggleCheckbox = string => {
    switch (string) {
      case 'kwh':
        this.setState({ kwh: !this.state.kwh });
        break;
      case 'bill':
        this.setState({ bill: !this.state.bill });
        break;
      case 'savings':
        this.setState({ savings: !this.state.savings });
        break;
      default:
        console.log('hi');
        break;
    }
  };

  changeSortValue = value => {
    this.setState({ sort: value });
    this.sort(value);
  };

  sort = value => {
    switch (value) {
      case 'date':
        this.sortByDate();
        break;
      case 'bill':
        this.sortByBill();
        break;
      case 'kwh':
        this.sortByKwh();
        break;
      case 'savings':
        this.sortBySavings();
        break;
      default:
        console.log('hi');
    }
  };

  deleteBillOpen = () => {
    this.setState({ deleteBillOpen: !this.state.deleteBillOpen });
  };

  pushToFilter = object => {
    this.setState({
      data: this.state.rawData.filter(element => element !== object)
    });
  };

  render() {
    return (
      <Router>
        <div className='app'>
          <Route
            exact
            path='/'
            render={props => (
              <React.Fragment>
                {' '}
                {this.state.newBillOpen ? (
                  <NewBill
                    months={this.state.months}
                    data={this.state.rawData}
                    addNewBill={this.addNewBill}
                  />
                ) : null}
                {this.state.deleteBillOpen && (
                  <DeleteBill
                    data={this.state.data}
                    deleteBillOpen={this.deleteBillOpen}
                    filterArray={this.state.filterArray}
                    pushToFilter={this.pushToFilter}
                  />
                )}
                {(this.state.newBillOpen === false) &
                (this.state.deleteBillOpen === false) ? (
                  <React.Fragment>
                    <Header
                      sort={this.sort}
                      changeSortValue={this.changeSortValue}
                      reverse={this.reverse}
                      kwh={this.state.kwh}
                      bill={this.state.bill}
                      savings={this.state.savings}
                      toggleCheckbox={this.toggleCheckbox}
                      addNewBill={this.addNewBill}
                      deleteBillOpen={this.deleteBillOpen}
                    />
                    <Content
                      data={this.state.data}
                      start={this.state.start}
                      end={this.state.end}
                      kwh={this.state.kwh}
                      bill={this.state.bill}
                      savings={this.state.savings}
                      filter={this.state.filterArray}
                    />
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            )}
          />

          <Route
            path='/changecontent'
            render={props => (
              <ChangeContent
                months={this.state.months}
                changeStart={this.changeStart}
                changeEnd={this.changeEnd}
                resetStartEnd={this.resetStartEnd}
                start={this.state.start}
                end={this.state.end}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
