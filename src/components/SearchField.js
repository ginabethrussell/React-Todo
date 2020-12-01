import React, { useState, useEffect } from 'react';

function SearchField(props){
    const { filterSearch } = props
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        filterSearch(searchTerm);
    }, [searchTerm])

   return (
       <div className="search-field">
        <label htmlFor='search'>Search Todos</label>
        <input 
        type='text'
        id='search'
        name='search'
        value={ searchTerm }
        placeholder='...search'
        onChange={handleChange}
        />
        </div>
   ) 
}

export default SearchField;