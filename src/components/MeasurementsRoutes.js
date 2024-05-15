import { Routes, Route } from "react-router-dom"

import Light from "./Measurements/Light"
import Color from "./Measurements/Color"
import FlowAndLevel from "./Measurements/FlowAndLevel"
import Humidity from "./Measurements/Humidity"
import Pressure from "./Measurements/Pressure"
import SmokeGasAlcohol from "./Measurements/SmokeGasAlcohol"
import StrainAndWeight from "./Measurements/StrainAndWeight"
import Temperature from "./Measurements/Temperature"


export function MeasurementsRoutes() {
  return (
    <Routes>
      <Route path="light" element={<Light/>}></Route>
      <Route path="color" element={<Color/>}></Route>
      <Route path="flow_and_level" element={<FlowAndLevel/>}></Route>
      <Route path="humidity" element={<Humidity/>}></Route>
      <Route path="pressure" element={<Pressure/>}></Route>
      <Route path="smoke_gas_alcohol" element={<SmokeGasAlcohol/>}></Route>
      <Route path="strain_and_weight" element={<StrainAndWeight/>}></Route>
      <Route path="temperature" element={<Temperature/>}></Route>
    </Routes>
  )
}