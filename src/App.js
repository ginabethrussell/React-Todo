import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

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
      todos: todos
    };
  }

  updateState = (todo) => {
    console.log(this.state.todos);
    this.setState(this.state.todos = [...this.state.todos,
      {
        task: todo,
        id: Date.now(),
        completed: false
      }]);
  };
  
  handleClear = (e) => {
    e.preventDefault();
    this.setState(this.state.todos = []);
  }

  render() {
    return (
      <div>
        <h2>Welcome to your Todo App!</h2>
        <TodoList todolist={this.state.todos}/>
        {console.log(this.state.todos)}
        <TodoForm updateState={this.updateState}/>
        <button onClick={this.handleClear}>Clear All</button>
      </div>
    );
  }
}

export default App;
