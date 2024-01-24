import React from "react";
import cl from "./Table.module.css"

const Table = ({columns, rows, className, onRowClick, ...props}) => {
  return (
    <table className={`${cl.table} ${className}`} {...props} cellSpacing="0">
      <thead>
        <tr>
          {columns.map((column, index) => 
            <th key={index}>{column}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr 
            key={row.key} 
            tabIndex={0} 
            onClick={() => onRowClick(row.key)}
            onKeyDown={e => e.key === "Enter" && onRowClick(row.key)}>
            {row.columns.map((column, index) => 
              <td key={index}>{column}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
