import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';





import axios from 'axios';
import { useState, useEffect} from 'react';
import './Table.css'




export default function LightTableListByHardwareId() {

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [totalSize, setTotalSize] = useState(0);
  const [showPagination, setShowPagination] = useState(false)
  const [hardwareId, setHardwareId] = useState('');
  const [measurementsList, setMeasurementsList] = useState([]);
  const urlList = 'http://192.168.0.10:8001/api/data/light/list_hid'

  const fetchDataList = async (url) => {
    const response = await axios.get(url, {
      params: {
        page: page,
        size: size,
        hardware_id: hardwareId
      },
    })

    console.log(response);

    const items = response.data.data.items;
    const total = response.data.data.total;


    for (let index = 0; index < items - 1; index++) {
      const element = items[index];
      const correctDatetime = new Date(element.created_at);
      element.created_at = correctDatetime.toString();
    }
    

    setTotalSize(total);
    setMeasurementsList(items);

    if (total !== 0) {
        setShowPagination(true);
    } else {
        setShowPagination(false);
      }
      
  }



  const handleChangeHardwareId = (event) => {
    setHardwareId(event.target.value);
  };

  const handleChangePage = (event, newPage) => {

    if (newPage <= 0){
        setPage(1);
    } else {
        setPage(newPage);
    }

    fetchDataList(urlList);
    
  };




    function defaultLabelDisplayedRows({ from, to, count })
    { 
        return  `${from - size}–${to - size} of ${count !== -1 ? count : `more than ${to}`}`; 
    }


 
  return (
    <div>

      <h1>List of light measurements by hardware id</h1>

      <div className='Params' align="center">
        
      </div>
          
    <div className='Table'>
        <Button className="UpdateButton" variant="contained" onClick={() => fetchDataList(urlList)}>Update</Button>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell align="center">Hardware ID</TableCell>
                    <TableCell align="center">Indication</TableCell>
                    <TableCell align="center">Unit</TableCell>
                    <TableCell align="center">Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {measurementsList.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center">{row.hardware_id}</TableCell>
                        <TableCell align="center">{row.indication}</TableCell>
                        <TableCell align="center">{row.unit}</TableCell>
                        <TableCell align="center">{row.created_at}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>




                <TableFooter>
                    <TableRow style={{width: "100%", margin: "0px"}}>

                        <TextField 
                        style={{width: "100%", margin: "5px"}} 
                        id="outlined-basic" 
                        label="Hardware ID" 
                        variant="outlined" 
                        type="text" 
                        onChange={handleChangeHardwareId}/>

                        {showPagination ?
                            <TablePagination
                            style={{width: "20%", margin: "0px", padding: '0px'}}
                            colSpan={4}
                            rowsPerPageOptions={[]}
                            count={totalSize}
                            rowsPerPage={size}
                            page={page}
                            slotProps={{
                                select: {
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            ActionsComponent={TablePaginationActions}
                            labelDisplayedRows={defaultLabelDisplayedRows}
                            />
                        : null }
                    

                        
                    </TableRow>
                </TableFooter>







            </Table>
        </TableContainer>
    </div>
      

    </div>
  );
}















function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>

        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 1}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
       
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    labelDisplayedRows: PropTypes.func.isRequired
  };