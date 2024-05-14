import React from "react";
import {Route, HashRouter, Routes} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { MeasurementsRoutes } from "./components/Measurements/MeasurementsRoutes";
import Description from './components/Description'
import "./App.css";





const headerMenuItemStyle = {
  outline: "none",
  cursor: "pointer",
  fontWeight: "500",
  padding: "0 15px",
  color: "#FFFFFF",
  background: "transparent",
  lineHeight: "1.15",
  fontSize: "16px",
  height: "36px",
  wordSpacing: "0px",
  letterSpacing: '.0892857143em',
  textDecoration: 'none',
  textTransform: 'uppercase',
  textAlign: "center",
  transition: "background 280ms cubic-bezier(0.4, 0, 0.2, 1)",
}

const menuItemStyle = {
  cursor: "pointer",
  fontWeight: "500",
  color: "#000000",
  fontSize: "14px",
  textDecoration: 'none',
}




function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




  return (

    <HashRouter>
      <div className="App">


        <header className="header">
          <Button
            style={headerMenuItemStyle}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            component={NavLink} to="/"
          >
            Description
          </Button>

          <Button
            style={headerMenuItemStyle}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Measurements
          </Button>

            <Menu
              
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <NavLink 
                  style={menuItemStyle}
                  to="/measurements/light">
                    Light
                </NavLink>
              </MenuItem>




          </Menu>


        </header>





        <main>
          <Routes>
              <Route path="/" element={<Description/>}/>
              <Route path="/measurements/*" element={<MeasurementsRoutes/>}/>
              
          </Routes>
        </main>
        
      
      </div>
    </HashRouter>


  );
}
export default App;