import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo/';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';

class App extends Component {
    state = {
    todos: [
        {id: 1, name: 'Learn JSX', isComplete: true},
        {id: 2, name: 'Build an awesome app', isComplete: false},
        {id: 3, name: 'Ship it!', isComplete: false}
    ],
    current_todo: ''
}
    handleRemove = (id, evt) => {
        evt.preventDefault()
        const updatedTodos = removeTodo(this.state.todos, id)
        this.setState({
            todos: updatedTodos
        })
    }
    handleToggle = (id) => {
        const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
        const updatedTodos = getUpdatedTodos(id, this.state.todos)

        this.setState({
            todos: updatedTodos
        })
    }
    handleInputChange = (e) =>{
        this.setState({
            current_todo: e.target.value
        })
    }
    handleSubmit = (evt) => {
        evt.preventDefault();

        const newId = generateId();

        const newTodo = {
            name: this.state.current_todo,
            isComplete: false,
            id: newId
        }

        const updatedTodos = addTodo(this.state.todos, newTodo);
        this.setState({
            todos: updatedTodos,
            current_todo: '',
            errorMessage: ''
        })

    }

    handleEmptySubmit = (evt) =>{
        evt.preventDefault()
        this.setState({
            errorMessage: 'Please supply a Todo Name'
        })
    }
  render() {
        const submitHandler = this.state.current_todo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
            {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
        <TodoForm handleInputChange={this.handleInputChange} current_todo={this.state.current_todo} handleSubmit={submitHandler}/>
            <TodoList todos={this.state.todos} handleToggle={this.handleToggle} handleRemove={this.handleRemove} />
        </div>
      </div>
    );
  }
}

export default App;
