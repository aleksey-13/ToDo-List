import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ]
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      /*
      const indx = todoData.findIndex((el) => el.id === id);

      const newArr = [
        ...todoData.slice(0, indx), 
        ...todoData.slice(indx + 1)
      ];
      */

      const newTodoData = todoData.filter((el) => el.id !== id);

      return {
        todoData: newTodoData
      };
    });
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      important: false,
      id: Math.floor(Math.random() * 1000)
    }

    this.setState(({ todoData }) => {
      const newData = [...todoData];

      newData.push(newItem);

      return {
        todoData: newData
      }
    });
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList 
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
        />

        <ItemAddForm onItemAdd={this.addItem} />
      </div>
    );  
  }
};