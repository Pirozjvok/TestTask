import React, { useState } from "react";
import Select from "../UI/select/Select";

const UserSort = ({sort, setSort}) => {
  const onSortChange = (value) => {
    const newSort = {...sort, sort: value }
    setSort(newSort)
  }

  const onOrderChange = (value) => {
    const newSort = {...sort, order: value }
    setSort(newSort)
  }

  return (
    <div>
      <Select 
        onChange={onSortChange} 
        value={sort.sort}
        options={[
          {name: 'По ФИО', value: 'name'},
          {name: 'По возрасту', value: 'age'},
          {name: 'По полу', value: 'gender'},
          {name: 'По адресу', value: 'address'}
        ]}/>
      <Select 
        onChange={onOrderChange} 
        value={sort.order}
        style={{marginLeft: '8px'}}
        options={[
          {name: 'Без сортировки.', value: 'default'},
          {name: 'По возрастанию.', value: 'asc'},
          {name: 'По убыванию.', value: 'dsc'},
        ]}/>
    </div>
  );
};

export default UserSort;
