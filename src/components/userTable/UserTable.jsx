import React from "react";
import Table from '../UI/table/Table'

const UserTable = ({users, onRowClick, className}) => {
  return (
    <div className={className}>
      <Table 
        style={{width: "100%", marginTop: '16px', textAlign: 'center'}}
        onRowClick={onRowClick}
        columns={['ФИО', 'Возраст', 'Пол', 'Номер телефона', 'Адрес']}
        rows={users.map(user => ({
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
