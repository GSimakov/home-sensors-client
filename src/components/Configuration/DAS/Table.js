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
import { useCallback } from 'react';

import showButtonStyle from '../../../static/componentsStyles';
import ModalUpdate from './Update'
import TablePaginationActions from '../../../utils/TablePagination';



export default function TableDAS(){
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [itemsLenght, setItemsLenght] = useState();


    const [totalSize, setTotalSize] = useState(0);
    const [showPagination, setShowPagination] = useState(false)
    const [measurementsList, setMeasurementsList] = useState([]);
    const urlList = process.env.REACT_APP_CONFIGURATION_SERVER_URL+'api/user/DAS/list'

    const urlObject = process.env.REACT_APP_CONFIGURATION_SERVER_URL+'api/user/DAS/'




    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const handleCloseUpdate = useCallback(() => {
        setIsOpenUpdate(false);
    }, []);

    const [onUpdateItem, setOnUpdateItem] = useState({})
















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
    return  ` Items ${from-size}-${from-size + itemsLenght - 1} of ${count}`; 
  }


  const Update = async(row) => {
    const response = await axios.get(urlObject + row.id);
    setOnUpdateItem(response.data.data)
    setIsOpenUpdate(true);
  }



  return (
    <div className='TablePage'>

        {
            isOpenUpdate
            && <ModalUpdate isOpen={isOpenUpdate}
                            onCloseModal={handleCloseUpdate}
                            onUpdateData={onUpdateItem}
            />
        }


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
                                        onPageChange={handleChangePage}
                                        ActionsComponent={TablePaginationActions}                            
                                        labelDisplayedRows={defaultLabelDisplayedRows}
                                        />
                                    : null }
                            </TableRow>
                                <TableRow>
                                <TableCell style={{width: "20%", margin:'0px'}} align="center">Name</TableCell>
                                <TableCell style={{width: "20%", margin:'0px'}} align="center">Board ID</TableCell>
                                <TableCell style={{width: "20%", margin:'0px'}} align="center">Config ID</TableCell>
                                <TableCell style={{width: "10%", margin:'0px'}} align="center">State</TableCell>
                                <TableCell style={{width: "20%", margin:'0px'}} align="center">Created At</TableCell>
                                <TableCell style={{width: "20%", margin:'0px'}} align="center">Actions</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {measurementsList.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.board_id}</TableCell>
                                    <TableCell align="center">{row.config_id}</TableCell>
                                    <TableCell align="center">{row.state}</TableCell>
                                    <TableCell align="center">{row.created_at}</TableCell>
                                    <TableCell align="center">

                                        <Button {...row.getRowProps} onClick={() => Update(row)}>update</Button>

                                        {/* <IconButton {...row.getRowProps}
                                            style={{width: "40%", margin:"0px"}}
                                            onClick={() => handleEditData(row)}
                                            
                                            aria-label="search">
                                            <EditIcon style={{ fill: "black"}} />
                                        </IconButton> */}

                                        {/* <IconButton
                                            style={{width: "40%", margin:"0px"}}
                                            aria-label="search">
                                            <DeleteIcon style={{ fill: "black"}} />
                                        </IconButton> */}

                                    </TableCell>

                                </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    {showPagination ?
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


    </div>
  );
}