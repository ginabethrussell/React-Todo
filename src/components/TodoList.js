// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from 'react';
import Todo from './Todo';

function TodoList(props) {
    const { todolist } = props;
    console.log(todolist);
    return (
        <div>
            {
            todolist.map(item => (
                <Todo key={item.id} todo={item.task} />
            )) 
            }
        </div>
    )
};

export default TodoList;