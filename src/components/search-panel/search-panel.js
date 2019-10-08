import React, { Component } from 'react';

import './search-panel.css';

export default class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    //console.log(e.target.value)
      this.setState({
        label: e.target.value
      })
      this.props.onSearch(e.target.value);
  };

  render() {
    return (
      <input type="text"
            className="form-control search-input"
            placeholder="type to search" 
            onChange={this.onLabelChange}
            value={this.state.label}
            />
      );
    };
}