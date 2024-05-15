import {React, useState} from "react";

import './MeasurementsPage.css'
import LightTableList from './Tables/Light/LightTableList'
import LightTableListByHardwareId from "./Tables/Light/LightTableByHardwareId";
import LightGraph from "./Graphs/LightGraph";



export default function Light() {
  
    return (
    
    <div>
        <h1>LIGHT MEASUREMENTS</h1>
        <div className="Options">
          <LightTableList/>
          <LightTableListByHardwareId/>
          <LightGraph/>
        </div>

    </div>
  );
  

};
