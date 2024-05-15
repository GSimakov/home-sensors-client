import {React, useState} from "react";

import './MeasurementsPage.css'
import FAWTableList from "./Tables/FlowAndLevel/FALTableList";
import FAWTableListByHardwareId from "./Tables/FlowAndLevel/FALTableByHardwareId";
import FAWGraph from "./Graphs/FlowAndLevelGraph";


export default function FlowAndLevel() {
  
    return (
    
    <div>
        <h1>FLOW AND LEVEL MEASUREMENTS</h1>
        <div className="Options">
          <FAWTableList/>
          <FAWTableListByHardwareId/>
          <FAWGraph/>
        </div>

    </div>
  );
  

};
