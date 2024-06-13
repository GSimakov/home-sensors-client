import {React, useState} from "react";

import './MeasurementsPage.css'
import TemperatureTableList from "./Tables/Temperature/TemperatureTableList";
import TemperatureTableListByHardwareId from "./Tables/Temperature/TemperatureTableByHardwareId";
import TemperatureGraph from "./Graphs/TemperatureGraph";


export default function Temperature() {
  
    return (
    
    <div>
        <h1>Измерения температуры</h1>
        <div className="Options">
          <TemperatureTableList/>
          <TemperatureTableListByHardwareId/>
          <TemperatureGraph/>
        </div>

    </div>
  );
  

};
