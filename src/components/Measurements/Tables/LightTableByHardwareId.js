import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';


import axios from 'axios';
import { useState, useEffect} from 'react';
import './Table.css'




export default function LightTableListByHardwareId() {

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);
  
  const [hardwareId, setHardwareId] = useState('');

  const [measurementsList, setMeasurementsList] = useState([]);

  const urlList = 'http://192.168.0.10:8001/api/data/light/list_hid'

  const fetchDataList = async (url) => {
    const response = await axios.get(url, {
      params: {
        page: page,
        size: size,
        hardware_id: hardwareId
      },
    })

    const items = response.data.data.items;

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const correctDatetime = new Date(element.created_at);
      element.created_at = correctDatetime.toString();
    }
    
    setMeasurementsList(items);

  }
  
  useEffect(() => {
    fetchDataList(urlList);
  }, []);
  

  const handleChangeHardwareId = (event) => {
    setHardwareId(event.target.value);
  };

    const handleChangePage = (event) => {
        setPage(event.target.value);
    };

    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };
 
  return (
    <div>

      <h1>List of light measurements by hardware id</h1>

      <div className='Params' align="center">
        <TextField style={{width: "50%", margin: "30px"}} className="Param" id="outlined-basic" label="Hardware ID" variant="outlined" type="text" onChange={handleChangeHardwareId}/>
        <TextField style={{width: "15%", margin: "30px"}} className="Param" label="Page" variant="standard" type="number" onChange={handleChangePage}/>
        <TextField style={{width: "15%", margin: "30px"}} className="Param" label="Size" variant="standard" type="number" onChange={handleChangeSize}/>
      </div>
          
    <div className='Table'>
        <Button className="UpdateButton" variant="contained" onClick={() => fetchDataList(urlList)}>Update</Button>

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
                    {measurementsList.map((row) => (
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
      

    </div>
  );
}