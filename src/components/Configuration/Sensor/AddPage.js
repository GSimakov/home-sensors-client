import * as React from 'react';
import {useState} from 'react';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';

import "../addPage.css"

export default function AddSensor() {
    const navigate = useNavigate(); 
    const location = useLocation();

    const[newObjName, setNewObjName] = useState('');

    const serverURL = process.env.REACT_APP_CONFIGURATION_SERVER_URL

    async function addItem(){
        await axios.post(
            serverURL + 'api/user/sensor/',
            {
                name: newObjName,
            }
        ).then(response => {
            navigate(-1);
        })
    }

    return (
           <div>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Добавить датчик
                </Typography>
                <div className='form-menu'>
                    <form>
                        <input 
                            placeholder={'Имя'} 
                            type="text" 
                            id="name" 
                            name="fname" 
                            onChange={(e) => setNewObjName(e.target.value)}>
                        </input>
                    </form>

                        <IconButton className='icon-button' onClick={addItem}>
                            <CheckIcon></CheckIcon>
                        </IconButton>
                </div>
            </div>
    )
}