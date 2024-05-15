import {React, useState} from "react";

import './MeasurementsPage.css'
import ColorTableList from "./Tables/Color/ColorTableList";
import ColorTableListByHardwareId from "./Tables/Color/ColorTableByHardwareId";
import ColorGraph from "./Graphs/ColorGraph";


export default function Color() {
  
    return (
    
    <div>
        <h1>COLOR MEASUREMENTS</h1>
        <div className="Options">
          <ColorTableList/>
          <ColorTableListByHardwareId/>
          <ColorGraph/>
        </div>

    </div>
  );
  

};
