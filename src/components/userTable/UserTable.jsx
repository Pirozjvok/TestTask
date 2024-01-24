import React, { useMemo, useState } from "react";
import Table from '../UI/table/Table'
import Select from "../UI/select/Select";

function compare(a, b) {
  if (a < b){
    return -1;
  }
  if ( a > b ){
    return 1;
  }
  return 0;
}

function sortUsers(users, sort, order) {
  if (!order || order === 'default')
    return users
  const sortedUsers = [...users].sort((a, b) => compare(a[sort], b[sort]))
  if (order === 'dsc') {
    sortedUsers.reverse()
  }
  return sortedUsers
}

const UserTable = ({users, onRowClick, className}) => {
  const [sort, setSort] = useState('name')
  const [order, setOrder] = useState('default')

  const sortedUsers = useMemo(() => sortUsers(users, sort, order), [users, sort, order])

  const onSortChange = (value) => {
    setSort(value)
  }

  const onOrderChange = (value) => {
    setOrder(value)
  }
  
  return (
    <div className={className}>
      <Select 
        onChange={onSortChange} 
        value={sort}
        options={[
          {name: 'По ФИО', value: 'name'},
          {name: 'По возрасту', value: 'age'},
          {name: 'По полу', value: 'gender'},
          {name: 'По адресу', value: 'address'}
        ]}/>
      <Select 
        onChange={onOrderChange} 
        value={order}
        options={[
          {name: 'Без сортировки.', value: 'default'},
          {name: 'По возрастанию.', value: 'asc'},
          {name: 'По убыванию.', value: 'dsc'},
        ]}/>
      <Table 
        style={{width: "100%", marginTop: '16px', textAlign: 'center'}}
        onRowClick={onRowClick}
        columns={['ФИО', 'Возраст', 'Пол', 'Номер телефона', 'Адрес']}
        rows={sortedUsers.map(user => ({
          key: user.id,
          columns:
          [
            user.name,
            `${user.age} лет`,
            user.gender,
            user.phone,
            user.address        
          ]}))}
        />
    </div>    
  )
};

export default UserTable;
