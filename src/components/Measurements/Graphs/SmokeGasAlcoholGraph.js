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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import NumberInput from 'react-number-input'
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import { light } from '@mui/material/styles/createPalette';

import './Graph.css'
import showButtonStyle from '../../../static/componentsStyles'





export default function SGAGraph() {
    const [showData, setShowData] = useState(false);
    const [hardwareId, setHardwareId] = useState('');
    const [graphLimit, setGraphLimit] = useState(50);
    const urlGraph = process.env.REACT_APP_SERVER_URL+'api/graphs/smoke_gas_alcohol'

    const fetchData = async (url) => {
            const response = await axios.get(
                url,
                
                {
                    params: {
                        hardware_id: hardwareId,
                        limit: graphLimit
                    },
                    responseType:"blob"
                }
            ).catch(error => {console.log(error)})
        
                const blob = new Blob([response.data], { type: "application/octet-stream" });
        const fileUrl = window.URL.createObjectURL(blob);


        const tempLink = document.createElement("a");
        tempLink.href = fileUrl;
        tempLink.setAttribute(
          "download",
          response.headers.filename
        );
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
    }

    return (
        <div>
            <Button 
                style={showButtonStyle}
                onClick={() => setShowData(!showData)}
            >
                gets measurements graph
            </Button>
        {showData ? 
            <div>
                <form className='Form'>
                    <TextField
                        style={{ fill: "blue", width: "50%", margin:"0px"}} 
                        id="search-bar"
                        onInput={(e) => {
                        setHardwareId(e.target.value);
                        }}
                        label="Hardware ID"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                    />
                    
                    <TextField
                        style={{ fill: "blue", width: "45%", margin:"0px"}} 
                        id="search-bar"
                        label="Measurements Limit"
                        type="number"
                        onInput={(e) => {
                            setGraphLimit(e.target.value);
                        }}
                        InputProps={{ inputProps: { min: 1} }}
                        size="small"
                        variant="outlined"
                    />

                    <IconButton style={{width: "4%", margin:"0px"}}
                        onClick={() => fetchData(urlGraph)} aria-label="search">
                        <DownloadIcon style={{ fill: "black"}} />
                    </IconButton>
                </form>
            </div>
            :null}

        </div>
  );
};
