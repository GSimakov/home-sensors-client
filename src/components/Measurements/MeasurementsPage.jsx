import React from 'react';
import { Button } from '@mui/material';
import MenuItem from '@mui/material';


import "./MeasurementsPage.css";

import Light from './Light'





export default function MeasurementsPage() {

  const [lightVisible, setLightVisible] = React.useState(false);
  const openLight = () => setLightVisible(true);
  const closeLight = () => setLightVisible(false);

  const [SGAVisible, setSGAVisible] = React.useState(false);
  const openSGA = () => setSGAVisible(true);
  const closeSGA = () => setSGAVisible(false);

  function closeAll(){
    closeSGA();
    closeLight();
  }


  return (
    <div className="MeasurementsMenu">
      <header>
        <Button className='Button' variant="contained" onClick={openLight}>Light</Button>
        <Button className='Button' variant="contained" onClick={openSGA}>SGA</Button>
        <Button className='Button' variant="contained" onClick={closeAll}>CLEAR</Button>

      </header>


      <main>
        {lightVisible && <Light/>}
        {SGAVisible && <p>Its toggling visibility</p>}
      </main>
    </div>
  );

};
