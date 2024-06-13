import {React, useState} from "react";

import './MeasurementsPage.css'
import SAWTableListByHardwareId from "./Tables/StrainAndWeight/SAWTableByHardwareId";
import SAWTableList from "./Tables/StrainAndWeight/SAWTableList";
import StrainAndWeightGraph from "./Graphs/StrainAndWeightGraph";


export default function StrainAndWeight() {
  
    return (
    
    <div>
        <h1>Измерения силы и веса</h1>
        <div className="Options">
          <SAWTableList/>
          <SAWTableListByHardwareId/>
          <StrainAndWeightGraph/>
        </div>

    </div>
  );
  

};
