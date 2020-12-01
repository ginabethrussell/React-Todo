// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React from 'react';
import Todo from './Todo';

function TodoList(props) {
    const { todolist, markComplete } = props;
   
    return (
        <div className='list-wrapper'>
            {
            todolist.map((item, index) => (
                <Todo key={item.id} number={index + 1} todo={item} markComplete={markComplete}/>
            )) 
            }
        </div>
    )
};

export default TodoList;