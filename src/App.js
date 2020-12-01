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
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor(){
    super();
    this.state = {
      todos: todos,
      filteredTodos: todos
    };
  }

  componentDidMount = () => {
    let storedTodos = window.localStorage.getItem('todos');
    storedTodos = JSON.parse(storedTodos);
    if (storedTodos !== null){
      this.setState({
        todos: storedTodos
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
      this.setState({ todos:  [...this.state.todos,
        newTodo ], 
     });
      this.updateFilteredList(newTodo);
    }
  };

  // This is behind by 1 because it is being called before the state is updated at the end of the updateState function
  // non optimum fix - add the latest todo manually by passing it from the updateState function
  updateFilteredList = (todo) => {
    this.setState({ filteredTodos: [...this.state.todos, todo]})
  }

  handleClear = (e) => {
    e.preventDefault();
    this.setState(this.state.todos = this.state.todos.filter(todo => todo.completed == false));
    this.setState(this.state.filteredTodos = this.state.todos.filter(todo => todo.completed == false));
  }

  markComplete = (id) => {
    this.setState(this.state.filteredTodos.map(todo => {
      if (todo.id === id){
        todo.completed = true
      }
    }));
    this.setState(this.state.todos.map(todo => {
      if (todo.id === id){
        todo.completed = true
      }
    }));
  }

  filterSearch = (searchTerm) => {
    console.log('searchTerm', searchTerm);
    if (searchTerm !== ''){
      this.setState({ filteredTodos: this.state.todos.filter(todo => todo.task.toLowerCase().includes(searchTerm.toLowerCase()))})
    }else {
      this.setState({ filteredTodos: JSON.parse(window.localStorage.getItem('todos'))});
    }  
  }
  
  render() {
    return (
      <div className='app-wrapper'>
        <h1>My Todos</h1>
        <SearchField filterSearch={this.filterSearch} />
        {console.log('filteredlist', this.state.filteredTodos)}
          {console.log('todos', this.state.todos)}
        <TodoList todolist={this.state.filteredTodos} markComplete={this.markComplete}/>
        <div className='form-button-wrapper'>
          <TodoForm updateState={this.updateState}/>
          <button onClick={this.handleClear}>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
