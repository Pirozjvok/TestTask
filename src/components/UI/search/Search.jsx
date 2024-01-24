import React, { useState } from 'react';
import cl from './Search.module.css'

const Search = ({className, onSearch}) => {
  const [query, setQuery] = useState('')

  const onClick = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const onChange = (e) => {
    setQuery(e.target.value)
  }
  
  let formClass = cl.form
  if (className)
    formClass += ' ' + className

  return (
    <form className={formClass}>
      <input type='text' className={cl.query} placeholder='Поиск...' value={query} onChange={onChange}/>
      <button className={cl.btn} onClick={onClick}>Поиск</button>
    </form>
  )
};

export default Search;
