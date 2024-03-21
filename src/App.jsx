import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useMemo} from 'react';


import SensorsTable from './Table/Sensors'
// import { useTable } from 'react-table'
// import {COLUMNS} from './constants/Table'



function App() {
  // const [users, setUsers] = useState([]);

  // const getApiData = async () => {
  //   const response = await fetch(
  //     'http://192.168.0.10:8000/api/v1/sensor/list'    
  //     ).then((response) => response.json());

  //   setUsers(response.data.items);
  // };

  // useEffect(() => {
  //   getApiData();
  // }, []);










  // const columns = useMemo(() => COLUMNS, [])
  // const data = useMemo(() => users, [])


  // const tableInstance = useTable({
  //   columns,
  //   data
  // })


  // const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance

  return (
    <div className="app">



    <SensorsTable/>







      
    </div>
  );
}

export default App;

