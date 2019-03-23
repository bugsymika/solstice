import React, { Component } from 'react';
import './css/deletebill.css';
import DeleteBillChip from './DeleteBillChip';
export default class DeleteBill extends Component {
  state = { filterArray: [] };
  toggleDel = object => {
    this.setState({
      filter: this.props.data.filter(
        element => this.state.filterArray.includes(element) === false
      )
    });
  };
  render() {
    return (
      <div className='container'>
        <div onClick={this.props.deleteBillOpen}>
          {' '}
          <i className='icono-leftArrow' />
        </div>

        <h1>Delete a bill</h1>
        <div className='formContainer'>
          <div className='chipContainer'>
            <DeleteBillChip
              data={this.props.data.filter(
                element => this.state.filterArray.includes(element) === false
              )}
              pushToFilter={this.props.pushToFilter}
              toggleDel={this.toggleDel}
              deletable={this.state.deletable}
              deleteBillOpen={this.props.deleteBillOpen}
            />
          </div>
        </div>
      </div>
    );
  }
}
