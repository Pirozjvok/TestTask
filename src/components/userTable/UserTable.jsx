import React, { useMemo } from 'react'
import { COLUMNS } from './Columns'
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
} from 'react-table'
import cl from './UserTable.module.css'

const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

function Table({ columns, data, onRowClick }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 50,
      width: 50, 
      maxWidth: 300,
    }),
    []
  )

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        ...columns
      ])
    }
  )

  return (
    <div {...getTableProps()} className={cl.table}>
      <div>
        {headerGroups.map(headerGroup => (
          <div
            {...headerGroup.getHeaderGroupProps({})}
            className={cl.tr}
          >
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps(headerProps)} className={cl.th}>
                {column.render('Header')}
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={cl.resizer}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={cl.tbody}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <div {...row.getRowProps()} 
              className={cl.tr} 
              tabIndex={0} 
              onClick={() => onRowClick(row.original.id)}
              onKeyDown={e => e.key === 'Enter' && onRowClick(row.original.id)}>
              {row.cells.map(cell => {
                return (
                  <div {...cell.getCellProps(cellProps)} className={cl.td}>
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const UserTable = ({users, onRowClick, className}) => {
  const columns = useMemo(() => COLUMNS, [])

  return (
    <Table columns={columns} data={users} onRowClick={onRowClick}/>
  )
};

export default UserTable
