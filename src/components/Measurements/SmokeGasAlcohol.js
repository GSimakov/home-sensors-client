import {React, useState} from "react";

import './MeasurementsPage.css'
import SGAList from "./Tables/SmokeGasAlcohol/SGATableList";
import SGAListByHardwareId from "./Tables/SmokeGasAlcohol/SGATableByHardwareId";
import SGAGraph from "./Graphs/SmokeGasAlcoholGraph";


export default function SmokeGasAlcohol() {
  
    return (
    
    <div>
        <h1>SMOKE GAS ALCOHOL MEASUREMENTS</h1>
        <div className="Options">
          <SGAList/>
          <SGAListByHardwareId/>
          <SGAGraph/>
        </div>

    </div>
  );
  

};
