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
import TableHead from '@mui/material/TableHead';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

import TablePaginationActions from '../../../utils/TablePagination';
import '../table.css'

export default function TableBoard(){
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
            serverURL + 'api/user/board/list_paginated', 
            page,
            size,
        );
      }, [page, size]);

    function changeRouteUpdate(row){
        navigate(row.id, { state: {row} });
    }

    function changeRouteAdd(){
        navigate('create');
    }

    function defaultLabelDisplayedRows({from, count})
    {
        return  ` Items ${from-size}-${from-size + itemsLenght - 1} of ${count}`; 
    }

      return (
        <>
            <h1>Board</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TablePagination
                                style={{width: "20%", margin: "0px", padding: '0px'}}
                                colSpan={7}
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
                            <TableCell style={{width: "30%", margin:'0px'}} align="center">Name</TableCell>
                            <TableCell style={{width: "10%", margin:'0px'}} align="center">Description</TableCell>
                            <TableCell style={{width: "10%", margin:'0px'}} align="center">Address</TableCell>
                            <TableCell style={{width: "10%", margin:'0px'}} align="center">Hardware ID</TableCell>
                            <TableCell style={{width: "10%", margin:'0px'}} align="center">Created At</TableCell>
                        </TableRow>

                    </TableHead>
    
                    <TableBody>
                        {list.map((row) => (
                        <TableRow 
                            key={row.id}
                            onDoubleClick={() => {changeRouteUpdate(row)}}

                            
                            sx={{ '&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                            <TableCell align="center">{row.hardware_id}</TableCell>
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