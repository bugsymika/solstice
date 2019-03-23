import React, { Component } from 'react';
import './css/header.css';
import Sort from './Sort';
import { Link } from 'react-router-dom';
export default class Header extends Component {
  render() {
    return (
      <header>
        <div className='headerBars'>
          <Link to='/changecontent'>
            <div className='clickable'>Change Range</div>
          </Link>
          <div className='clickable' onClick={this.props.addNewBill}>
            Add New Bill
          </div>
          <div className='clickable' onClick={this.props.deleteBillOpen}>
            Delete A Bill
          </div>
          <div className='clickable' onClick={this.props.reverse}>
            Reverse Order
          </div>
        </div>
        <div className='sort'>
          <Sort
            sort={this.props.sort}
            changeSortValue={this.props.changeSortValue}
          />
        </div>
        <div className='checkboxes'>
          <input
            type='checkbox'
            name='kwh'
            value='kwh'
            onChange={() => this.props.toggleCheckbox('kwh')}
            checked={this.props.kwh}
          />
          KWH
          <input
            type='checkbox'
            name='bill'
            value='bill'
            onChange={() => this.props.toggleCheckbox('bill')}
            checked={this.props.bill}
          />
          Bill
          <input
            type='checkbox'
            name='savings'
            value='savings'
            onChange={() => this.props.toggleCheckbox('savings')}
            checked={this.props.savings}
          />
          Savings
        </div>
      </header>
    );
  }
}
