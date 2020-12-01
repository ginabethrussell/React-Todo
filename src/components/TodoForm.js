import React, { useState } from 'react';

function TodoForm(props){
    const { updateState }= props
    const [todo, setTodo] = useState('');

    const handleChange = e => {
        setTodo(e.target.value)
    }
    const handleSubmit = e =>{
        e.preventDefault();
        updateState(todo);
        setTodo('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' 
                name='todo' 
                placeholder='...todo'
                value={todo} 
                onChange={handleChange}
            />
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default TodoForm;