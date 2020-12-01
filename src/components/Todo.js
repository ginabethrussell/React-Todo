import React from 'react';

function Todo (props) {
    const { todo } = props;

    return (
    <div>{todo}</div>
    )
}

export default Todo;