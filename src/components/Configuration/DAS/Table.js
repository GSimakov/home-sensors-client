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
import { useCallback, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { useNavigate, Navigate} from "react-router-dom";


import showButtonStyle from '../../../static/componentsStyles';
import ModalUpdate from './DataAquisitionSystemTEST'
import TablePaginationActions from '../../../utils/TablePagination';
import './table.css'



export default function TableDAS(){
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [itemsLenght, setItemsLenght] = useState();
    const [totalSize, setTotalSize] = useState(0);
    const [list, setList] = useState([]);
    const navigate = useNavigate(); 

    const serverURL = process.env.REACT_APP_CONFIGURATION_SERVER_URL

    async function getList(url, currentPage, currentSize){
        await axios.get(url, {
            params: {
              page: currentPage,
              size: currentSize,
            },
          }).then(response => {
            const items = response.data.data.items;
            const lenght = items.length
            const total = response.data.data.total;

            setTotalSize(total);
            setItemsLenght(lenght);
            setList(items);
            
          })
    }

    useEffect(() => {
        getList(
            serverURL + 'api/user/DAS/list', 
            page,
            size,
        );
      }, [page, size]);

    function changeRoute(row){
        navigate(row.id, { state: {row} });
    }

      function defaultLabelDisplayedRows({from, count})
      {
          return  ` Items ${from-size}-${from-size + itemsLenght - 1} of ${count}`; 
      }

      return (
        <>
        
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TablePagination
                                style={{width: "20%", margin: "0px", padding: '0px'}}
                                colSpan={6}
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
                                onPageChange={(newPage) => {setPage(newPage)}}
                                ActionsComponent={TablePaginationActions}                            
                                labelDisplayedRows={defaultLabelDisplayedRows}
                                />

                        </TableRow>
    
                        <TableRow>
                            <TableCell style={{width: "20%", margin:'0px'}} align="center">Name</TableCell>
                            <TableCell style={{width: "20%", margin:'0px'}} align="center">Board ID</TableCell>
                            <TableCell style={{width: "20%", margin:'0px'}} align="center">Sensor ID</TableCell>
                            <TableCell style={{width: "20%", margin:'0px'}} align="center">Config ID</TableCell>
                            <TableCell style={{width: "10%", margin:'0px'}} align="center">State</TableCell>
                            <TableCell style={{width: "10%", margin:'0px'}} align="center">Created At</TableCell>
                        </TableRow>

                    </TableHead>
    
                    <TableBody>
                        {list.map((row) => (
                        <TableRow 
                            key={row.id}
                            onDoubleClick={() => {changeRoute(row)}}

                            
                            sx={{ '&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.board_id}</TableCell>
                            <TableCell align="center">{row.sensor_id}</TableCell>
                            <TableCell align="center">{row.config_id}</TableCell>

                            {row.state ?
                                <TableCell className='state-cell-on' component="td" scope="row">ON</TableCell>
                            :
                                <TableCell className='state-cell-off' component="td" scope="row">OFF</TableCell>
                            }

                            <TableCell align="center">{row.created_at}</TableCell>
                        </TableRow>))}
                    </TableBody>
    
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                style={{width: "20%", margin: "0px", padding: '0px'}}
                                colSpan={6}
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
                                onPageChange={(newPage) => {setPage(newPage)}}
                                ActionsComponent={TablePaginationActions}                            
                                labelDisplayedRows={defaultLabelDisplayedRows}
                            />
                        </TableRow>    
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
      );
}