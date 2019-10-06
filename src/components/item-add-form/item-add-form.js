import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
    render() {
        return (
            <div className="item-add-form">
                <input type="text"
            className="form-control todo-input"
            placeholder="type to new todo" />

                <button 
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => this.props.onItemAdd('item')}>
                    Add
                </button>
            </div>
        );
    }
}