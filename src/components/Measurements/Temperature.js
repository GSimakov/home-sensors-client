import {React, useState} from "react";
import axios from "axios";
import { useEffect } from "react";

// import TemperatureTable from "../Tables/TemperatureTable";
import BasicTable from '../Measurements/Tables/TemperatureTable'



function Temperature() {
  
    return (
    
    <div>
        <BasicTable/>
    </div>
  );
  

};
export default Temperature;