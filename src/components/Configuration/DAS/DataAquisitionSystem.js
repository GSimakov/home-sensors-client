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
import {InputLabel, Input, TextField} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';




import "./item.css"

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




export default function DataAquisitionSystem({state}) {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [item, setItem] = useState(location.state.row)

    const [currentItemName, setCurrentItemName] = useState(location.state.row.name);
    const [currentBoardId, setCurrentBoardId] = useState(location.state.row.board_id);
    const [currentSensorId, setCurrentSensoirId] = useState(location.state.row.sensor_id);
    const [currentConfigId, setCurrentConfigId] = useState(location.state.row.config_id);




    const [boardsList, setBoardList] = useState([]);
    const [sensorsList, setSensorsList] = useState([]);
    const [configsList, setConfigsList] = useState([]);

    const [currentBoard, setCurrentBoard] = useState({})
    const [currentSensor, setCurrentSensor] = useState({})
    const [currentConfig, setCurrentConfig] = useState({})

    const [newBoardId, setNewBoardId] = useState(item.board_id);
    const [newSensorId, setNewSensorId] = useState(item.sensor_id);
    const [newConfigId, setNewConfigId] = useState(item.config_id);

    const [changeItemNameState, setChangeItemNameState] = useState(false);
    const [newItemName, setNewItemName] = useState('');


    const serverURL = process.env.REACT_APP_CONFIGURATION_SERVER_URL
    console.log(newItemName);

    async function getBoard(){
        await axios.get(serverURL + 'api/user/board/' + currentBoardId).then(response => {
            setCurrentBoard(response.data.data)
        });
        console.log('getBoard');
    }

    async function getSensor(){
        await axios.get(serverURL + 'api/user/sensor/' + currentSensorId).then(response => {
            setCurrentSensor(response.data.data)
        })
        console.log('getSensor');

    }

    async function getConfig(){
        await axios.get(serverURL + 'api/user/config/' + currentConfigId).then(response => {
            setCurrentConfig(response.data.data)
        })
        console.log('getConfig');

    }

    async function getBoards() {
        await axios.get(serverURL + 'api/user/board/list').then(response => {
            setBoardList(response.data.data);
        })
        console.log('getBoards');

    }

    async function getConfigs() {
        const response = await axios.get(serverURL + 'api/user/config/list').then(response => {
            setConfigsList(response.data.data);
        })
        console.log('getConfigs');

    }

    async function getSensors() {
        const response = await axios.get(serverURL + 'api/user/sensor/list').then(response => {
            setSensorsList(response.data.data);
        })
        console.log('getSensors');

    }

    const handleChangeBoard = (event) => {
        setNewBoardId(event.target.value.id);
    };

    const handleChangeSensor = (event) => {
        setNewBoardId(event.target.value.id);
    };

      const handleChangeConfig = (event) => {
        setNewBoardId(event.target.value.id);
    };

    async function changeItemName(){
        setChangeItemNameState(false);
        await axios.put(
            serverURL + 'api/user/DAS/' + item.id,
            {
                name: newItemName,
            }
        ).then(response => {
            setCurrentItemName(response.data.data.name);
        })

        
    }

      useEffect(() => {
        getBoard();
      }, []);

      useEffect(() => {
        getConfig();
      }, []);

      useEffect(() => {
        getSensor();
      }, []);

      
    useEffect(() => {
        getBoards();
    }, []);

    useEffect(() => {
        getConfigs();
    }, []);

    useEffect(() => {
        getSensors();
    }, []);


    console.log(newBoardId);
    async function updateItem(){
        console.log(newBoardId);
        console.log(newConfigId);
        console.log(newSensorId);

        await axios.put(
            serverURL + 'api/user/DAS/' + item.id,
            {
                board_id: newBoardId
            }
        ).then(response => {
            console.log(response);
        })
    }

    return (
        <>
            <div className='go-back-button'>
                <Button onClick={() => navigate(-1)}>GO BACK</Button>
            </div>

            {changeItemNameState ?
                <div className='item-name-changing'>
                    <TextField id="standard-basic" variant="standard" placeholder={item.name} style={{width: '40%'}}
                        onChange={(e) => {
                        console.log(e.target.value);
                        setNewItemName(e.target.value);
                        }}
                    />
                    <IconButton onClick={changeItemName}>
                        <CheckIcon></CheckIcon>
                    </IconButton>
                </div>
            : 
                <div className='item-name'>
                    <h1>{currentItemName}</h1>
                    <IconButton onClick={() => setChangeItemNameState(true)}>
                        <EditIcon></EditIcon>
                    </IconButton>
                </div>
            }
            <div className='data-table'>
                <TableContainer component={Paper} className='t-container'>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row">Item</TableCell>
                                <TableCell component="th" scope="row">Current Value</TableCell>
                                <TableCell component="th" scope="row">New Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell component="td" scope="row">Board</TableCell>
                                <TableCell component="td" scope="row">{currentBoard.name}</TableCell>

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
                                        <IconButton onClick={() => getBoards()} sx={{width: '10%'}}>
                                            <RefreshIcon></RefreshIcon>
                                        </IconButton>
                                    </div>
                                </TableCell>    
                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Sensor</TableCell>
                                <TableCell component="td" scope="row">{currentSensor.name}</TableCell>

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
                                        <IconButton onClick={() => getSensors()} sx={{width: '10%'}}>
                                            <RefreshIcon></RefreshIcon>
                                        </IconButton>
                                    </div>
                                </TableCell>    
                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Config</TableCell>
                                <TableCell component="td" scope="row">{currentConfig.name}</TableCell>

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
                                        <IconButton onClick={() => getConfigs()} sx={{width: '10%'}}>
                                            <RefreshIcon></RefreshIcon>
                                        </IconButton>
                                    </div>
                                </TableCell>

                            </TableRow>
                        </TableBody>

                    </Table>
                </TableContainer>

                <Button onClick={updateItem}>UPDATE</Button>


            </div>
        </>
    );
  }