import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { MenuItem, Select} from '@mui/material';
import {InputLabel, TextField} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "../item.css"

export default function DataAquisitionSystem() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [item, setItem] = useState(location.state.row)

    const [currentItemName, setCurrentItemName] = useState(location.state.row.name);
    const [currentBoardId, setCurrentBoardId] = useState(location.state.row.board_id);
    const [currentSensorId, setCurrentSensorId] = useState(location.state.row.sensor_id);
    const [currentConfigId, setCurrentConfigId] = useState(location.state.row.config_id);
    const [currentState, setCurrentState] = useState(location.state.row.state)


    const [boardsList, setBoardList] = useState([]);
    const [sensorsList, setSensorsList] = useState([]);
    const [configsList, setConfigsList] = useState([]);

    const [currentBoard, setCurrentBoard] = useState({})
    const [currentSensor, setCurrentSensor] = useState({})
    const [currentConfig, setCurrentConfig] = useState({})

    

    const [newBoardId, setNewBoardId] = useState(item.board_id);
    const [newSensorId, setNewSensorId] = useState(item.sensor_id);
    const [newConfigId, setNewConfigId] = useState(item.config_id);
    const [newState, setNewState] = useState(item.state);


    const [changeItemNameState, setChangeItemNameState] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    const serverURL = process.env.REACT_APP_CONFIGURATION_SERVER_URL

    async function getBoard(){
        await axios.get(serverURL + 'api/user/board/' + currentBoardId).then(response => {
            setCurrentBoard(response.data.data)
        });
    }

    async function getSensor(){
        await axios.get(serverURL + 'api/user/sensor/' + currentSensorId).then(response => {
            setCurrentSensor(response.data.data)
        })
    }

    async function getConfig(){
        await axios.get(serverURL + 'api/user/config/' + currentConfigId).then(response => {
            setCurrentConfig(response.data.data)
        })
    }

    async function getBoards() {
        await axios.get(serverURL + 'api/user/board/list').then(response => {
            setBoardList(response.data.data);
        })
    }

    async function getConfigs() {
        const response = await axios.get(serverURL + 'api/user/config/list').then(response => {
            setConfigsList(response.data.data);
        })
    }

    async function getSensors() {
        const response = await axios.get(serverURL + 'api/user/sensor/list').then(response => {
            setSensorsList(response.data.data);
        })
    }

    const handleChangeBoard = (event) => {
        setNewBoardId(event.target.value.id);
    };

    const handleChangeSensor = (event) => {
        setNewSensorId(event.target.value.id);
    };

    const handleChangeConfig = (event) => {
        setNewConfigId(event.target.value.id);
    };

    const handleChangeState = (event) => {
        setNewState(event.target.value);
        console.log(event.target.value)
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
        if (!(currentBoardId === null)) {
            getBoard();
        }
    }, []);

    useEffect(() => {
        if (!(currentConfigId === null)) {
            getConfig();
        }
    }, []);

    useEffect(() => {
        if (!(currentSensorId === null)) {
            getSensor();
            console.log('chlen' + currentSensorId)
        }
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


    async function updateItem(){
        await axios.put(
            serverURL + 'api/user/DAS/' + item.id,
            {
                board_id: newBoardId,
                sensor_id: newSensorId,
                config_id: newConfigId,
                state: newState
            }
        ).then(response => {
            navigate(-1)
        })
    }


    async function deleteItem(){
        await axios.delete(
            serverURL + 'api/user/DAS/' + item.id,
        ).then(response => {
            navigate(-1)
        })
    }

    return (
        <div>
            <div className='go-back-button'>
                <IconButton className='go-back-button-icon' onClick={() => navigate(-1)}>
                    <ArrowBackIcon></ArrowBackIcon>
                </IconButton>
            </div>

            <div>

                {changeItemNameState ?
                    <div className='item-name-changing'>
                        <div className='item-name-changing-block'>
                            <TextField id="standard-basic" variant="standard" placeholder={item.name} style={{width: '90%'}}
                                onChange={(e) => {
                                setNewItemName(e.target.value);
                                }}
                            />
                            <IconButton onClick={changeItemName}>
                                <CheckIcon></CheckIcon>
                            </IconButton>
                        </div>
                        
                        <div className='delete-button-container'>
                            <IconButton className='delete-button' onClick={deleteItem}>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </div>
                    </div>
                : 
                    <div className='item-name'>
                        <div className='item-name-changing-block'>

                            <h1>{currentItemName}</h1>
                            <IconButton onClick={() => setChangeItemNameState(true)}>
                                <EditIcon></EditIcon>
                            </IconButton>
                        </div>
                        <div className='delete-button-container'>
                            <IconButton className='delete-button' onClick={deleteItem}>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </div>

    
                    </div>
                }



            </div>

            <div className='data-table'>
                <TableContainer component={Paper} className='t-container'>
                    <Table className='table' aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row">Объект</TableCell>
                                <TableCell component="th" scope="row">Текущее значение</TableCell>
                                <TableCell component="th" scope="row">Новое значение</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell component="td" scope="row">Плата</TableCell>
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
                                <TableCell component="td" scope="row">Датчик</TableCell>
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
                                <TableCell component="td" scope="row">Конфигурация</TableCell>
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
                            <TableRow>
                                <TableCell component="td" scope="row">Состояние</TableCell>
                                {currentState ?
                                    <TableCell component="td" scope="row">ON</TableCell>
                                :
                                    <TableCell component="td" scope="row">OFF</TableCell>
                                }

                                <TableCell component="td" scope="row" className='table-item'>

                                <div className='table-item-select'>
                                        <Select 
                                            defaultValue=""
                                            sx={{width: '90%'}}
                                            onChange={handleChangeState}
                                        >
                                                <MenuItem key={'ON'} value={1}>ON</MenuItem>
                                                <MenuItem key={'OFF'} value={0}>OFF</MenuItem>
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

            </div>
            <div className='update-button-container'>
                <Button sx={{

                }}
                className='update-button' onClick={updateItem}>Применить изменения</Button>
            </div>
        </div>
    );
}