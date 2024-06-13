import {React, useState} from "react";

import './MeasurementsPage.css'
import PressureTableList from "./Tables/Pressure/PressureTableList";
import PressureTableListByHardwareId from "./Tables/Pressure/PressureTableByHardwareId";
import PressureGraph from "./Graphs/PressureGraph";


export default function Pressure() {
  
    return (
    
    <div>
        <h1>Измерения давления</h1>
        <div className="Options">
          <PressureTableList/>
          <PressureTableListByHardwareId/>
          <PressureGraph/>
        </div>

    </div>
  );
  

};
