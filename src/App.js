import React from "react";
import {
  Routes,
  Route,
  Router,
} from "react-router-dom";
import {NavLink} from "react-router-dom";
import MeasurementsPage from './components/MeasurementsPage'
import Description from './components/Description'
import "./App.css";




function App() {
  return (



    <div className="App">
      <header className="header">
        <NavLink className='header-item' to="/description">Description</NavLink>
        <NavLink className='header-item' to="/measurements">Measurements</NavLink>

      </header>





      <main>
      <Routes>
            <Route path="/description" element={<Description/>}/>
            <Route path="/measurements" element={<MeasurementsPage/>}/>

        </Routes>
      </main>
      
    </div>
  );
}
export default App;