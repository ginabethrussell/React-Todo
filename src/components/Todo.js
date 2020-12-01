import React from 'react';

function Todo (props) {
    const { todo, markComplete } = props;
    const handleComplete = (id) => {
        markComplete(id);
    }
    return (
    <div onClick={() => handleComplete(todo.id)}>{todo.task}</div>
    )
}

export default Todo;