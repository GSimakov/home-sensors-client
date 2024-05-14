import {React, useState} from "react";

import LightTableList from './Tables/LightTableList'
import LightTableListByHardwareId from "./Tables/LightTableByHardwareId";
import Graph from "./Tables/Graph";



export default function Light() {
  
    return (
    
    <div>
        <LightTableList/>
        <LightTableListByHardwareId/>
        <Graph/>
    </div>
  );
  

};
