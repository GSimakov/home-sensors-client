import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


import axios from 'axios';
import { useState, useEffect} from 'react';




export default function BasicTable(z) {



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


  return (
    <div>
      <Button variant="contained" onClick={fetchData}>Update</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Hardware ID</TableCell>
              <TableCell align="center">Indication</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {measurements.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.hardware_id}</TableCell>
                <TableCell align="center">{row.indication}</TableCell>
                <TableCell align="center">{row.unit}</TableCell>
                <TableCell align="center">{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}