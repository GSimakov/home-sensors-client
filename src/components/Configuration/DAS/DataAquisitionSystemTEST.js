import * as React from 'react';
import {useState, useEffect} from 'react';
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

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl } from 'react-bootstrap';
import { nnNO } from '@mui/material/locale';



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
  
  
  
  export default function DataAquisitionSystem(props){
      const {
          isOpen,
          onCloseModal,
          onUpdateItemDefault,
          onUpdateItemId,
          boards,
          configs,
          sensors
      } = props;

      const [onUpdateData, setOnUpdateData] = useState(onUpdateItemDefault)

      const [boardsList, setBoardList] = useState(boards);
      const [sensorsList, setSensorsList] = useState(sensors);
      const [configsList, setConfigsList] = useState(configs);


      const [selectedBoard, setSelectedBoard] = useState(null);
      const [selectedSensor, setSelectedSensor] = useState(null);
      const [selectedConfig, setSelectedConfig] = useState(null);

      const [newItem, setNewItem] = useState({})


      async function getItem() {
        const response = await axios.get(urlDAS + onUpdateItemId);
        setOnUpdateData(response.data.data)
    }


 

      const handleChangeBoard = (event) => {
        setSelectedBoard(event.target.value.id);
        newItem.board_id = event.target.value.id;
        /// не успевает ничего как обычно
      };

      const handleChangeSensor = (event) => {
        setSelectedSensor(event.target.value);
        newItem.sensor_id = event.target.value.id;
        /// не успевает ничего как обычно
      };

      const handleChangeConfig = (event) => {
        setSelectedConfig(event.target.value);
        newItem.config_id = event.target.value.id;
        /// не успевает ничего как обычно
      };




      const urlListBoards = process.env.REACT_APP_CONFIGURATION_SERVER_URL + 'api/user/board/list'
      const urlListConfigs = process.env.REACT_APP_CONFIGURATION_SERVER_URL + 'api/user/config/list'
      const urlListSensors = process.env.REACT_APP_CONFIGURATION_SERVER_URL + 'api/user/sensor/list'

      const urlDAS = process.env.REACT_APP_CONFIGURATION_SERVER_URL + 'api/user/DAS/'


    async function getBoards() {
        const response = await axios.get(urlListBoards)
        setBoardList(response.data.data);
    }

    async function getConfigs() {
        const response = await axios.get(urlListConfigs)
        setConfigsList(response.data.data);
    }

    async function getSensors() {
        const response = await axios.get(urlListSensors)
        setSensorsList(response.data.data);
    }

      async function updateItem(){
        await axios.put(urlDAS + onUpdateData.id, newItem);
        await getItem();


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
                                                    
                                                    {boardsList.map((item) => (
                                                        <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <IconButton onClick={() => getBoards(urlListBoards)} sx={{width: '10%'}}>
                                                    <RefreshIcon></RefreshIcon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="td" scope="row">Sensor</TableCell>
                                        <TableCell component="td" scope="row">{onUpdateData.sensor.name}</TableCell>
                                        <TableCell component="td" scope="row" className='table-item'>
                                                <div className='table-item-label'>
                                                <InputLabel>Total: {sensorsList.length}</InputLabel>
                                            </div>
                                            <div className='table-item-select'>
                                                <Select 
                                                    defaultValue=""
                                                    sx={{width: '90%'}}
                                                    onChange={handleChangeSensor}
                                                >
                                                    
                                                    {sensorsList.map((item) => (
                                                        <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <IconButton onClick={() => getSensors(urlListSensors)} sx={{width: '10%'}}>
                                                    <RefreshIcon></RefreshIcon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="td" scope="row">Config</TableCell>
                                        <TableCell component="td" scope="row">{onUpdateData.config.name}</TableCell>
                                        <TableCell component="td" scope="row" className='table-item'>
                                                <div className='table-item-label'>
                                                <InputLabel>Total: {configsList.length}</InputLabel>
                                            </div>
                                            <div className='table-item-select'>
                                                <Select 
                                                    defaultValue=""
                                                    sx={{width: '90%'}}
                                                    onChange={handleChangeConfig}
                                                >
                                                    
                                                    {configsList.map((item) => (
                                                        <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <IconButton onClick={() => getConfigs(urlListConfigs)} sx={{width: '10%'}}>
                                                    <RefreshIcon></RefreshIcon>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    
                                </TableBody>
                                </Table>
                            </TableContainer>

                            <Button onClick={updateItem}>Update!</Button>
  
                  
                  </Box>
              </Modal>
          </div>
      )
  }