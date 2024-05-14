import {React, useState} from "react";

import LightTableList from './Tables/LightTableList'
import LightTableListByHardwareId from "./Tables/LightTableByHardwareId";



function Light() {
  
    return (
    
    <div>
        <LightTableList/>
        <LightTableListByHardwareId/>
    </div>
  );
  

};
export default Light;