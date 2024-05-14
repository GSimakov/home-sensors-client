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
import axios from 'axios';

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const tableShowButtonStyle = {
    marginTop: "0px",
    padding: "0px",
    fontFamily:"monospace",
    textTransform: 'lowercase',
  }


export default function Graph() {
    const [showData, setShowData] = useState(false);

    return (
        <div>
            <Button 
                style={tableShowButtonStyle}
                onClick={() => setShowData(!showData)}
            >
                gets measurements graph
            </Button>
        {showData ? 
            <div>
                PLACEHOLDER
            </div>
            :null}

        </div>
  );
};
