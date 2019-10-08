import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  render() {
    const { allItems, activeItems, doneItems } = this.props;

    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-info is-active"
                onClick={allItems}>All</button>
        <button type="button"
                className="btn btn-outline-secondary"
                onClick={activeItems}>Active</button>
        <button type="button"
                className="btn btn-outline-secondary"
                onClick={doneItems}>Done</button>
      </div>
    );  
  }
}