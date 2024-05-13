import { useTable } from 'react-table'
import React, { useState, useEffect, useMemo} from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';


import './tables.css'
import {MEASUREMENTS} from './components/Tables/measurements';


function TemperatureTable() {


    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);

    const [measurements, setMeasurements] = useState([]);


    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8001/api/data/light/list`, {
            params: {
                page: page,
                size: size,
            },
        })


        const items = response.data.data.items;

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            const correctDatetime = new Date(element.created_at);
            element.created_at = correctDatetime.toString();            
        }


        setMeasurements(items);
    }


    useEffect(() => {
      fetchData();
    }, []);
    
    
    const columns = useMemo(() => MEASUREMENTS, [MEASUREMENTS])
    const data = useMemo(() => measurements, [measurements])
  
  
    const tableInstance = useTable({
      columns,
      data
    })
  
  
    const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance
  
    if(refreshData){
        getData()
     }


  
    return (
      <div className="temperatureTable">

        <input value={page} onChange={e => setPage(e.target.value)}></input>
        {page}
        <button onClick={() => setRefreshData(!RefreshData)}>Refresh</button>




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
  
  export default TemperatureTable;