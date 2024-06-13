import {React, useState} from "react";

import './MeasurementsPage.css'
import HumidityTableList from "./Tables/Humidity/HumidityTableList";
import HumidityTableListByHardwareId from "./Tables/Humidity/HumidityTableByHardwareId";
import HumidityGraph from "./Graphs/HumidityGraph";


export default function Humidity() {
  
    return (
    
    <div>
        <h1>Измерения влажности</h1>
        <div className="Options">
          <HumidityTableList/>
          <HumidityTableListByHardwareId/>
          <HumidityGraph/>
        </div>

    </div>
  );
  

};
