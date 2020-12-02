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
    this.state = {
      todos: [],
      filteredTodos: []
    };
  }

  componentDidMount = () => {
    let storedTodos = window.localStorage.getItem('todos');
    storedTodos = JSON.parse(storedTodos);
    if (storedTodos !== null){
      this.setState({
        ...this.state,
          todos: storedTodos,
          filteredTodos: storedTodos
      });
    }else {
      window.localStorage.setItem('todos', JSON.stringify(this.state.todos));
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
        todos: [...this.state.filteredTodos,
          newTodo ],
        filteredTodos:  [...this.state.filteredTodos,
        newTodo ], 
     });
    }
  };

  
  //non ideal, duplicated code
  handleClear = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      filteredTodos: this.state.filteredTodos.filter(todo => todo.completed == false),
      todos: this.state.todos.filter(todo => todo.completed == false)
      
    });
  }
 
  //non ideal, duplicated code
  toggleComplete = (id) => {
    console.log(id);
    this.setState({
      ...this.state,
      filteredTodos: this.state.filteredTodos.map(todo => {
      if (todo.id === id){
        console.log(todo)
        return {
          ...todo,
          completed:  !todo.completed
        }
      }else{
        return todo;
    }})
  });
  }

  filterSearch = (searchTerm) => {
    if (searchTerm !== ''){
      this.setState({ 
        ...this.state,
        filteredTodos: this.state.todos.filter(todo => todo.task.toLowerCase().includes(searchTerm.toLowerCase()))})
    }else {
      this.setState({
        ...this.state,
        filteredTodos: JSON.parse(window.localStorage.getItem('todos'))});
    }  
  }
  
  render() {
    return (
      <div className='app-wrapper'>
        <h1>My Todos</h1>
        <SearchField filterSearch={this.filterSearch} />
        <TodoList todolist={this.state.filteredTodos} toggleComplete={this.toggleComplete}/>
        <div className='form-button-wrapper'>
          <TodoForm updateState={this.updateState}/>
          <button onClick={this.handleClear}>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
