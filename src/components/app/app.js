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
      this.createTodoItem('Drink Coffe'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    const newItem = {
      label,
      important: false,
      done: false,
      id: Math.floor(Math.random() * 1000)
    }
    return newItem;
  }

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

    this.setState(({ todoData }) => {
      const newData = [...todoData];

      newData.push(this.createTodoItem(text));

      return {
        todoData: newData
      };
    });
  };

  toggleProperty(arr, id, propertyName) {
    const indx = arr.findIndex((el) => el[id] === id);

    const oldItem = arr[indx];
    const newItem = { ...oldItem, [propertyName]: !oldItem[propertyName]};
    return [...arr.slice(0, indx), newItem, arr.slice(indx + 1)];
  }
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {    
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const doneItems = todoData.filter((el) => el.done === true).length;
    
    const todoItems = todoData.length - doneItems;
    
    return (
      <div className="todo-app">
        <AppHeader toDo={todoItems} done={doneItems} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList 
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdd={this.addItem} />
      </div>
    );  
  }
};