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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { MenuItem, Select } from '@mui/material';
import {InputLabel} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';




import Dropdown from 'react-bootstrap/Dropdown';


import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';

import showButtonStyle from '../../../static/componentsStyles';

import TablePaginationActions from '../../../utils/TablePagination';
import './dropdown.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl } from 'react-bootstrap';

import './dropdown.css'



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    borderRadius: 1,
    bgcolor: '#FFF5EE'
  };
  
  
  
  export default function ModalUpdate(props){
      const {
          isOpen,
          onCloseModal,
          onUpdateData
      } = props;


      const [anchorElBoard, setAnchorElBoard] = useState(null);
      const openBoard = Boolean(anchorElBoard);
      const handleClickBoard = (event) => {
        setAnchorElBoard(event.currentTarget);
      };
      const handleCloseBoard = () => {
        setAnchorElBoard(null);
      };

      const [boardsList, setBoardList] = useState([])
      const [sensorsList, setSensorsList] = useState([])
      const [configsList, setConfigsList] = useState([])


      const [selectedBoard, setSelectedBoard] = useState({})

      const handleChangeBoard = (event) => {
        setSelectedBoard(event.target.value);
        /// не успевает ничего как обычно
        console.log(event.target.value)
      };




      const urlListBoards = process.env.REACT_APP_CONFIGURATION_SERVER_URL + 'api/user/board/list'


      const getBoards = async (url) => {
        const response = await axios.get(url)
        setBoardList(response.data.data);
        console.log(boardsList);
      }
      
      ///FIX ERROR from logs
      return (
          <div>
              <Modal
                  open={isOpen}
                  onClose={onCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                  <Box sx={style}>
                    
                      <h1>{onUpdateData.name}</h1>
                      
                     

                        <TableContainer component={Paper}>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                        <TableCell component="th" scope="row">Item</TableCell>
                                        <TableCell component="th" scope="row">Current Value</TableCell>
                                        <TableCell component="th" scope="row">New Value</TableCell>

                                    </TableRow>


                                </TableHead>
                                <TableBody>
                                    
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="td" scope="row">Board</TableCell>
                                        <TableCell component="td" scope="row">{onUpdateData.board.name}</TableCell>
                                        <TableCell component="td" scope="row" className='table-item'>
                                            
                                            <div className='table-item-label'>
                                                <InputLabel>Total: {boardsList.length}</InputLabel>
                                            </div>

                                            <div className='table-item-select'>
                                                <Select 
                                                    defaultValue=""
                                                    sx={{width: '90%'}}
                                                    onChange={handleChangeBoard}
                                                >
                                                    
                                                    {boardsList.map((board) => (
                                                        <MenuItem key={board.id} value={board}>{board.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <IconButton onClick={() => getBoards(urlListBoards)} sx={{width: '10%'}}>
                                                    <RefreshIcon></RefreshIcon>
                                                </IconButton>
                                            </div>
                                    
                                        </TableCell>

                                    </TableRow>
                                    
                                </TableBody>
                                </Table>
                            </TableContainer>
  
                  
                  </Box>
              </Modal>
          </div>
      )
  }