import React from 'react';

function Todo (props) {
    const { todo, markComplete } = props;
    const handleComplete = (id) => {
        markComplete(id);
    }
    return (
    <div style={!!todo.completed ? {textDecoration: 'line-through'}: null}
    onClick={() => handleComplete(todo.id)}>{todo.task}</div>
    )
}

export default Todo;