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

export default function Config() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const [item, setItem] = useState(location.state.row)

    const [currentItemName, setCurrentItemName] = useState(location.state.row.name);
    const [currentSSID, setCurrentSSID] = useState(location.state.row.ssid);
    const [currentPassword, setCurrentPassword] = useState(location.state.row.password);
    const [currentConfURL, setCurrentConfURL] = useState(location.state.row.conf_url);
    const [currentDataURL, setCurrentDataURL] = useState(location.state.row.data_url);
    const [currentDelay, setCurrentDelay] = useState(location.state.row.delay);

    const [newSSID, setNewSSID] = useState(location.state.row.ssid);
    const [newPassword, setNewPassword] = useState(location.state.row.password);
    const [newConfURL, setNewConfURL] = useState(location.state.row.conf_url);
    const [newDataURL, setNewDataURL] = useState(location.state.row.data_url);
    const [newDelay, setNewDelay] = useState(location.state.row.delay);


    const [changeItemNameState, setChangeItemNameState] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    const serverURL = process.env.REACT_APP_CONFIGURATION_SERVER_URL


    async function changeItemName(){
        setChangeItemNameState(false);
        await axios.put(
            serverURL + 'api/user/config/' + item.id,
            {
                name: newItemName,
            }
        ).then(response => {
            setCurrentItemName(response.data.data.name);
        })
    }

    async function updateItem(){
        await axios.put(
            serverURL + 'api/user/config/' + item.id,
            {
                ssid: newSSID,
                password: newPassword,
                conf_url: newConfURL,
                data_url: newDataURL,
                delay: newDelay
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
                                <TableCell component="td" scope="row">SSID</TableCell>
                                <TableCell component="td" scope="row">{currentSSID}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentSSID} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewSSID(e.target.value)}>
                                        </input>
                                    </form>
                                </TableCell>
                                
 
                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Password</TableCell>
                                <TableCell component="td" scope="row">{currentPassword}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentPassword} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewPassword(e.target.value)}>
                                        </input>
                                    </form>
                                </TableCell>
                                
                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Config Service URL</TableCell>
                                <TableCell component="td" scope="row">{currentConfURL}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentConfURL} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewConfURL(e.target.value)}>
                                        </input>
                                    </form>
                                </TableCell>
                                

                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Measurement Service URL</TableCell>
                                <TableCell component="td" scope="row">{currentDataURL}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentDataURL} 
                                            type="text" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewDataURL(e.target.value)}>
                                        </input>
                                    </form>
                                </TableCell>

                                

                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">Delay</TableCell>
                                <TableCell component="td" scope="row">{currentDelay}</TableCell>
                                <TableCell component="td" scope="row">
                                    <form>
                                        <input 
                                            placeholder={currentDelay} 
                                            type="number" 
                                            id="name" 
                                            name="fname" 
                                            onChange={(e) => setNewDelay(e.target.value)}>
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
                className='update-button' onClick={updateItem}>ACCESS CHANGE</Button>
            </div>
        </div>
    );
}