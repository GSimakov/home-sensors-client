import React from 'react';
import { Button } from '@mui/material';
import MenuItem from '@mui/material';


import "./MeasurementsPage.css";

import Temperature from './Measurements/Temperature'





function MeasurementsPage() {

  const [temperatureVisible, setTemperatureVisible] = React.useState(false);
  const openTemperature = () => setTemperatureVisible(true);
  const closeTemperature = () => setTemperatureVisible(false);

  const [SGAVisible, setSGAVisible] = React.useState(false);
  const openSGA = () => setSGAVisible(true);
  const closeSGA = () => setSGAVisible(false);

  function closeAll(){
    closeSGA();
    closeTemperature();
  }


  return (
    <div className="MeasurementsMenu">
      <header>
        <Button className='Button' variant="contained" onClick={openTemperature}>Temperature</Button>
        <Button className='Button' variant="contained" onClick={openSGA}>SGA</Button>
        <Button className='Button' variant="contained" onClick={closeAll}>CLEAR</Button>

      </header>


      <main>
        {temperatureVisible && <Temperature/>}
        {SGAVisible && <p>Its toggling visibility</p>}
      </main>
    </div>
  );

};
export default MeasurementsPage;