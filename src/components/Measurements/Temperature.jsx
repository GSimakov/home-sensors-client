import {React, useState} from "react";

// import TemperatureTable from "../Tables/TemperatureTable";
import BasicTable from '../Tables/TemperatureTable'



function Temperature() {
  const [count, setCount] = useState(0);
  

    return (
    
    <div>
        <BasicTable/>
    </div>
  );
  

};
export default Temperature;