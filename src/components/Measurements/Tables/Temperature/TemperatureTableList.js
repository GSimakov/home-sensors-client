import * as React from 'react';
import { useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import '../Table.css'
import TablePaginationActions from '../../../../utils/TablePagination';

const tableShowButtonStyle = {
    marginTop: "0px",
    padding: "0px",
    fontFamily:"monospace",
    textTransform: 'lowercase',
  }


export default function TemperatureTableList() {
    const [showTable, setShowTable] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [itemsLenght, setItemsLenght] = useState();


    const [totalSize, setTotalSize] = useState(0);
    const [showPagination, setShowPagination] = useState(false)
    const [measurementsList, setMeasurementsList] = useState([]);
    const urlList = process.env.REACT_APP_MEASUREMENTS_SERVER_URL+'api/data/temperature/list'

  const fetchDataList = async (url, currentPage) => {
    const response = await axios.get(url, {
      params: {
        page: currentPage,
        size: size,
      },
    })

    const items = response.data.data.items;
    const itemsLenght = items.length
    const total = response.data.data.total;

    for (let index = 0; index < itemsLenght; index++) {
        const element = items[index];
        const correctDatetime = new Date(element.created_at);
        element.created_at = correctDatetime.toString();
      }
    
      setTotalSize(total);
      setItemsLenght(itemsLenght);
      setMeasurementsList(items);

    if (total !== 0) {
        setShowPagination(true);
    } else {
        setShowPagination(false);
      }

  }
  


  const handleChangePage = (newPage) => {
    setPage(newPage);
    fetchDataList(urlList, newPage);
  };

  function defaultLabelDisplayedRows({from, count})
  {
    return  `Записи ${from-size}-${from-size + itemsLenght - 1} из ${count}`; 
  }


  return (
    <div className='TablePage'>
        <Button 
          style={tableShowButtonStyle}
          onClick={() => setShowTable(!showTable)}
        >
          получить список измерений систем сбора данных
          </Button>


        {showTable ? 
            <div>
                <form className='Form'>
                    <IconButton
                        key='formitem'
                        style={{width: "4%", margin:"0px"}}
                        onClick={() => fetchDataList(urlList)} aria-label="search">
                        <SearchIcon style={{ fill: "black"}} />
                    </IconButton>
                </form>
          
                <div>
        
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                            <TableHead>
                            <TableRow>
                                {showPagination ?
                                    <TablePagination
                                        style={{width: "20%", margin: "0px", padding: '0px'}}
                                        colSpan={4}
                                        rowsPerPageOptions={[]}
                                        count={totalSize}
                                        rowsPerPage={size}
                                        page={page}
                                        slotProps={{
                                            select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                            },
                                        }}
                                        onPageChange={handleChangePage}
                                        ActionsComponent={TablePaginationActions}                            
                                        labelDisplayedRows={defaultLabelDisplayedRows}
                                        />
                                    : null }
                            </TableRow>
                                <TableRow>
                                <TableCell style={{width: "15%", margin:'0px'}} align="center">Идентификатор аппаратного обеспечения</TableCell>
                                <TableCell style={{width: "15%", margin:'0px'}} align="center">Измерение</TableCell>
                                <TableCell style={{width: "10%", margin:'0px'}} align="center">Ед. измерения</TableCell>
                                <TableCell style={{width: "60%", margin:'0px'}} align="center">Получено</TableCell>
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

                            <TableFooter>
                                <TableRow>
                                    {showPagination ?
                                        <TablePagination
                                            style={{width: "20%", margin: "0px", padding: '0px'}}
                                            colSpan={4}
                                            rowsPerPageOptions={[]}
                                            count={totalSize}
                                            rowsPerPage={size}
                                            page={page}
                                            slotProps={{
                                                select: {
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                                },
                                            }}
                                            onPageChange={handleChangePage}
                                            ActionsComponent={TablePaginationActions}                            
                                            labelDisplayedRows={defaultLabelDisplayedRows}
                                        />
                                        : null }
                                </TableRow>    
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        :null}


    </div>
  );
}