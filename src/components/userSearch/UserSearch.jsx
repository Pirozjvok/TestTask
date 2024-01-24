import React, { useState } from 'react';
import cl from './UserSearch.module.css'
import Button from '../UI/button/Button';

const Search = ({ className, query, setQuery, onSearch }) => {
  const onClick = (e) => {
    e.preventDefault()
    onSearch()
  }

  const onChange = (e) => setQuery(e.target.value)
  
  let formClass = cl.form

  if (className)
    formClass += ' ' + className

  return (
    <form className={formClass}>
      <input type='text' className={cl.query} placeholder='Поиск...' value={query} onChange={onChange}/>
      <Button className={cl.btn} onClick={onClick}>Поиск</Button>
    </form>
  )
};

export default Search;
