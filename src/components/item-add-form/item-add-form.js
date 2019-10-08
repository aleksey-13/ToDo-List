import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };
    
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.label !== '') {
            this.props.onItemAdd(this.state.label);
            this.setState({
                label: ''
            });
        }
    };

    render() {
        return (
            <form className="item-add-form" onSubmit={this.onSubmit}>
                <input type="text"
                    className="form-control todo-input"
                    placeholder="type to new todo" 
                    onChange={this.onLabelChange}
                    value={this.state.label}
                    />

                <button 
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.onSubmit}>
                    Add
                </button>
            </form>
        );
    }
}