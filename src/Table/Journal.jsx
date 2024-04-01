
import './tables.css'; // Tell webpack that Button.js uses these styles

import React, { useState, useEffect, useMemo} from 'react';
import { useTable } from 'react-table'
import {DAS_JOURNAL} from '../constants/columns/DASJournal'



function JournalTable() {

  const [journal, setJournal] = useState([]);

  const getApiData = async () => {
    const response = await fetch(
      'http://192.168.0.10:8000/api/v1/journal/list'    
    ).then((response) => response.json());
    setJournal(response.data.items);  
  };
  
  useEffect(() => {
    getApiData();
  }, []);


  for (let index = 0; index < journal.length; index++) {
    const element = journal[index];
    const correctDatetime = new Date(element.created_at);
    element.created_at = correctDatetime.toString();
  }

  
  const columns = useMemo(() => DAS_JOURNAL, [DAS_JOURNAL])
  const data = useMemo(() => journal, [journal])


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

export default JournalTable;
