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
            Описание
          </Button>

          <Button
            style={headerMenuItemStyle}
            aria-controls={openMeas ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMeas ? 'true' : undefined}
            onClick={handleClickMeas}
          >
            Измерения
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
                  Свет
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/color">
                  Цвет
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/flow_and_level">
                  Наполнение
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/humidity">
                  Влажность
              </NavLink>
            </MenuItem>



            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/pressure">
                  Давление
              </NavLink>
            </MenuItem>



            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/smoke_gas_alcohol">
                  Задымление
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/strain_and_weight">
                  Сила и вес
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseMeas}>
              <NavLink 
                style={menuItemStyle}
                to="/measurements/temperature">
                  Температура
              </NavLink>
            </MenuItem>

            

          </Menu>

          














          <Button
            style={headerMenuItemStyle}
            aria-controls={openConf ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openConf ? 'true' : undefined}
            onClick={handleClickConf}
          >
            Конфигурация
          </Button>

          <Menu
            anchorEl={anchorElConf}
            open={anchorElConf}
            onClose={handleCloseConf}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleCloseConf}>
              <NavLink 
                style={menuItemStyle}
                to="/configuration/das">
                  ССД
              </NavLink>
            </MenuItem>

            <MenuItem onClick={handleCloseConf}>
              <NavLink 
                style={menuItemStyle}
                to="/configuration/config">
                  Конфигурация
              </NavLink>
            </MenuItem>

            <MenuItem onClick={handleCloseConf}>
              <NavLink 
                style={menuItemStyle}
                to="/configuration/board">
                  Плата
              </NavLink>
            </MenuItem>


            <MenuItem onClick={handleCloseConf}>
              <NavLink 
                style={menuItemStyle}
                to="/configuration/measurement_type">
                  Тип измерений
              </NavLink>
            </MenuItem>

            <MenuItem onClick={handleCloseConf}>
              <NavLink 
                style={menuItemStyle}
                to="/configuration/sensor">
                  Датчик
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