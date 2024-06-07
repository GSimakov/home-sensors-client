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

export default function Sensor() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [item, setItem] = useState(location.state.row)

    const [currentItemName, setCurrentItemName] = useState(location.state.row.name);
    const [currentType, setCurrentType] = useState(location.state.row.type);
    const [currentMeasurementTypeID, setCurrentMeasurementTypeID] = useState(location.state.row.measurement_type_id);

    const [newType, setNewType] = useState(location.state.row.type);
    const [newMeasurementTypeID, setNewMeasurementTypeID] = useState(location.state.row.measurement_type_id);

    const [measurementTypeList, setMeasurementTypeList] = useState([]);
    const [currentMeasurementType, setCurrentMeasurementType] = useState({})

    const [changeItemNameState, setChangeItemNameState] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    const serverURL = process.env.REACT_APP_CONFIGURATION_SERVER_URL

    async function getMeasurementType(){
        await axios.get(serverURL + 'api/user/measurement_type/' + currentMeasurementTypeID).then(response => {
            setCurrentMeasurementType(response.data.data)
        });
    }

    async function getMeasurementTypes() {
        await axios.get(serverURL + 'api/user/measurement_type/list').then(response => {
            setMeasurementTypeList(response.data.data);
        })
    }

    const handleChangeMeasurementType = (event) => {
        setNewMeasurementTypeID(event.target.value.id);
    };

    useEffect(() => {
        if (!(currentMeasurementTypeID === null)) {
            getMeasurementType();
        }
    }, []);

    useEffect(() => {
        getMeasurementTypes();
    }, []);


    async function changeItemName(){
        setChangeItemNameState(false);
        await axios.put(
            serverURL + 'api/user/sensor/' + item.id,
            {
                name: newItemName,
            }
        ).then(response => {
            setCurrentItemName(response.data.data.name);
        })
    }

    async function updateItem(){
        await axios.put(
            serverURL + 'api/user/sensor/' + item.id,
            {
                type: newType,
                measurement_type_id: newMeasurementTypeID,

            }
        ).then(response => {
            navigate(-1)
        })
    }

    async function deleteItem(){
        await axios.delete(
            serverURL + 'api/user/config/' + item.id,
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
                                <TableCell component="th" scope="row">Item</TableCell>
                                <TableCell component="th" scope="row">Current Value</TableCell>
                                <TableCell component="th" scope="row">New Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell component="td" scope="row">Type</TableCell>
                                <TableCell component="td" scope="row">{currentType}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentType} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewType(e.target.value)}>
                                        </input>
                                    </form>
                                </TableCell>
                                
 
                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Measurement Type</TableCell>
                                <TableCell component="td" scope="row">{currentMeasurementType.name}</TableCell>
                                <TableCell component="td" scope="row" className='table-item'>
                                    <div className='table-item-label'>
                                        <InputLabel>Total: {measurementTypeList.length}</InputLabel>
                                    </div>
                                    <div className='table-item-select'>
                                        <Select 
                                            defaultValue=""
                                            sx={{width: '90%'}}
                                            onChange={handleChangeMeasurementType}
                                        >     
                                            {measurementTypeList.map((item) => (
                                                <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                        <IconButton onClick={() => getMeasurementTypes()} sx={{width: '10%'}}>
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
                className='update-button' onClick={updateItem}>ACCESS CHANGE</Button>
            </div>
        </div>
    );
}