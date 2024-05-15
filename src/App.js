import React from "react";
import {Route, HashRouter, Routes} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Popper } from '@mui/base/Popper';


import { MeasurementsRoutes } from "./components/MeasurementsRoutes";
import { ConfigurationRoutes } from "./components/ConfigurationRoutes";
import Description from './components/Description'
import "./App.css";





const headerMenuItemStyle = {
  outline: "none",
  cursor: "pointer",
  fontWeight: "500",
  padding: "20px",
  color: "#FFFFFF",
  marginLeft: "5px",
  marginRight: "5px",

  background: "transparent",
  fontSize: "16px",
  height: "36px",
  textDecoration: 'none',
  textTransform: 'uppercase',
  textAlign: "center",
  fontStyle: "italic",
}

const menuItemStyle = {
  cursor: "pointer",
  fontWeight: "500",
  color: "#000000",
  fontSize: "14px",
  textDecoration: 'none',
}




function App() {
  const [anchorElMeas, setAnchorElMeas] = React.useState(null);
  const openMeas = Boolean(anchorElMeas);
  const handleClickMeas = (event) => {
    setAnchorElMeas(event.currentTarget);
  };
  const handleCloseMeas = () => {
    setAnchorElMeas(null);
  };

  const [anchorElConf, setAnchorElConf] = React.useState(null);
  const openConf = Boolean(anchorElConf);
  const handleClickConf = (event) => {
    setAnchorElConf(event.currentTarget);
  };
  const handleCloseConf = () => {
    setAnchorElConf(null);
  };




  return (

    <HashRouter>
      <div className="App">

        <header className="header">

          <Button
            style={headerMenuItemStyle}
            component={NavLink} to="/"
          >
            Description
          </Button>

          <Button
            style={headerMenuItemStyle}
            aria-controls={openMeas ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMeas ? 'true' : undefined}
            onClick={handleClickMeas}
          >
            Measurements
          </Button>

          <Menu
            anchorEl={anchorElMeas}
            open={openMeas}
            onClose={handleCloseMeas}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/light">
                  Light
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/color">
                  Color
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/flow_and_level">
                  Flow And Level
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/humidity">
                  Humidity
              </NavLink>
            </MenuItem>



            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/pressure">
                  Pressure
              </NavLink>
            </MenuItem>



            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/smoke_gas_alcohol">
                  Smoke Gas Alcohol
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/strain_and_weight">
                  Strain And Weight
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/temperature">
                  Temperature
              </NavLink>
            </MenuItem>

          </Menu>

          <Menu
            anchorEl={anchorElConf}
            open={openConf}
            onClose={handleClickConf}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClickConf}>
              <NavLink 
                style={menuItemStyle}
                to="/configuration/placeholder">
                  placeholder
              </NavLink>
            </MenuItem>
          </Menu>

        </header>


        <main>
          <Routes>
              <Route path="/" element={<Description/>}/>
              <Route path="/measurements/*" element={<MeasurementsRoutes/>}/>
              <Route path="/configuration/*" element={<ConfigurationRoutes/>}/>

              
          </Routes>
        </main>
        
      
      </div>
    </HashRouter>


  );
}
export default App;