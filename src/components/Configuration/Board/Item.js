import * as React from 'react';
import {useState} from 'react';
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
import { TextField} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "../item.css"

export default function Board() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [item, setItem] = useState(location.state.row)

    const [currentItemName, setCurrentItemName] = useState(location.state.row.name);
    const [currentDescription, setCurrentDescription] = useState(location.state.row.description);
    const [currentAddress, setCurrentAddress] = useState(location.state.row.address);
    const [currentHardwareId, setCurrentHardwareId] = useState(location.state.row.hardware_id);

    const [newDescription, setNewDescription] = useState(location.state.row.description);
    const [newAddress, setNewAddress] = useState(location.state.row.address);
    const [newHardwareId, setNewHardwareId] = useState(location.state.row.hardware_id);

    
    const [changeItemNameState, setChangeItemNameState] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    const serverURL = process.env.REACT_APP_CONFIGURATION_SERVER_URL


    async function changeItemName(){
        setChangeItemNameState(false);
        await axios.put(
            serverURL + 'api/user/board/' + item.id,
            {
                name: newItemName,
            }
        ).then(response => {
            setCurrentItemName(response.data.data.name);
        })
    }

    async function updateItem(){
        await axios.put(
            serverURL + 'api/user/board/' + item.id,
            {
                description: newDescription,
                address: newAddress,
                hardware_id: newHardwareId
            }
        ).then(response => {
            navigate(-1)
        })
    }

    async function deleteItem(){
        await axios.delete(
            serverURL + 'api/user/board/' + item.id,
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
                                <TableCell component="td" scope="row">IP-адрес</TableCell>
                                <TableCell component="td" scope="row">{currentAddress}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentAddress} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewAddress(e.target.value)}>
                                        </input>
                                    </form>
                                </TableCell>
                                
 
                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Описание</TableCell>
                                <TableCell component="td" scope="row">{currentDescription}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentDescription} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewDescription(e.target.value)}>
                                        </input>
                                    </form>
                                </TableCell>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Идентификатор аппаратного обеспечения</TableCell>
                                <TableCell component="td" scope="row">{currentHardwareId}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentHardwareId} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewHardwareId(e.target.value)}>
                                        </input>
                                    </form>
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