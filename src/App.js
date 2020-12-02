import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SearchField from './components/SearchField';

import './components/Todo.css';

const todos = [
    {
      task: 'Organize Garage',
      id: 1528817077286,
      completed: false
    },
    {
      task: 'Bake Cookies',
      id: 1528817084358,
      completed: false
    }
  ];

class App extends React.Component {
  constructor(){
    super();
    let storedTodos = window.localStorage.getItem('todos');
    storedTodos = JSON.parse(storedTodos);
    if (storedTodos !== null){
      this.state = {
        todos: storedTodos,
        searchTerm: ''
      };
    }else{
      this.state = {
        todos: todos,
        searchTerm: ''
      };
    } 
  }


  componentDidUpdate = () => {
    window.localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  updateState = (todo) => {
    if (todo !== ''){
      const newTodo = {
        task: todo,
        id: Date.now(),
        completed: false
      };
      this.setState({ 
        ...this.state,
        todos: [...this.state.todos,
          newTodo ]
     });
    }
  };

  handleClear = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      todos: this.state.todos.filter(todo => todo.completed == false) 
    });
  }

  toggleComplete = (id) => {
    console.log(id);
    this.setState({
      ...this.state,
      todos: this.state.todos.map(todo => {
      if (todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      }else{
        return todo;
    }})
  });
  }

  filterSearch = (searchTerm) => {
      const newSearchTerm = searchTerm.toLowerCase()
      this.setState({ 
        ...this.state,
        searchTerm: newSearchTerm
      })
  }

  getTodoList = () => {
      return this.state.todos.filter(item => item.task.toLowerCase().includes(this.state.searchTerm))
  }

  render() {
    const todoList = this.getTodoList()
  
    return (
      <div className='app-wrapper'>
        <h1>My Todos</h1>
        <SearchField filterSearch={this.filterSearch} />
        <TodoList todolist={todoList} toggleComplete={this.toggleComplete}/>
        <div className='form-button-wrapper'>
          <TodoForm updateState={this.updateState}/>
          <button onClick={this.handleClear}>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
