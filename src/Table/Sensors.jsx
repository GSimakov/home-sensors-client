
import './tables.css'; // Tell webpack that Button.js uses these styles

import React, { useState, useEffect, useMemo} from 'react';
import { useTable } from 'react-table'
import {COLUMNS} from '../constants/Table'



function SensorsTable() {

  const [users, setUsers] = useState([]);

  const getApiData = async () => {
    const response = await fetch(
      'http://192.168.0.10:8000/api/v1/sensor/list'    
    ).then((response) => response.json());
    
    setUsers(response.data.items);



    
  };
  
  useEffect(() => {
    getApiData();
  }, []);

  
  const columns = useMemo(() => COLUMNS, [COLUMNS])
  const data = useMemo(() => users, [users])


  const tableInstance = useTable({
    columns,
    data
  })


  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance


  return (
    <div className="app">




    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}> 
                          {column.render('Header')}
                       </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                 prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                       {row.cells.map((cell) => {
                         return <td {...cell.getCellProps()}>
                          {cell.render('Cell')}</td>
                            })}
                    </tr>
                    )
                })
            }
        </tbody>
    </table>













    </div>
  );
}

export default SensorsTable;
