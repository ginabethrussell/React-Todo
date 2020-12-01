import React from 'react';

function Todo (props) {
    const { todo, number, markComplete } = props;
    const handleComplete = (id) => {
        markComplete(id);
    }
    return (
    <div className='todo' style={!!todo.completed ? {textDecoration: 'line-through'}: null}
    onClick={() => handleComplete(todo.id)}>{number}. {todo.task}</div>
    )
}

export default Todo;