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
      ],
      term: ''
    };

    newState = [...this.state.todoData];

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
      const newData = [...this.newState];
      newData.push(this.createTodoItem(text));
      this.newState = [...newData];
      return {
        todoData: newData
      };
    });
  };

  toggleProperty(arr, id, propertyName) {
    const indx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[indx];
    const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};
    const newData = [...arr.slice(0, indx), newItem, ...arr.slice(indx + 1)];
    this.newState = [...newData];
    return newData;
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

  allItems = () => {
    this.setState({
      todoData: this.newState
    });
  }

  activeItems = () => {
    this.setState(() => {
      const newData = this.newState.filter((el) => el.done === false);
      return {
        todoData: newData
      }
    });
  };

  doneItems = () => {
    this.setState(() => {
      const newData = this.newState.filter((el) => el.done === true);
      return {
        todoData: newData
      }
    });
  };

  search = (items, term) => {
    if (term.length === 0) return items;

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  render() {
    const { todoData, term } = this.state;

    const visibleItems = this.search(this.newState, term)

    const doneItems = this.newState.filter((el) => el.done === true).length;
    
    const todoItems = this.newState.length - doneItems;
    
    return (
      <div className="todo-app">
        <AppHeader toDo={todoItems} done={doneItems} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter 
            allItems={this.allItems}
            activeItems={this.activeItems}
            doneItems={this.doneItems}/>
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdd={this.addItem} />
      </div>
    );  
  }
};