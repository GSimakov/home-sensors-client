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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function AddDataAquisitionSystem(props) {
    const {
        isOpen,
        onCloseModal
    } = props;

    return (
            <Modal
            open={isOpen}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add data aquisition system
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
}