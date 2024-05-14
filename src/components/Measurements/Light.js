import {React, useState} from "react";

import './MeasurementsPage.css'
import LightTableList from './Tables/LightTableList'
import LightTableListByHardwareId from "./Tables/LightTableByHardwareId";
import Graph from "./Tables/Graph";



export default function Light() {
  
    return (
    
    <div>
        <h1>LIGHT MEASUREMENTS</h1>
        <LightTableList/>
        <LightTableListByHardwareId/>
        <Graph/>
    </div>
  );
  

};
