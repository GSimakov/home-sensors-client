import { Routes, Route } from "react-router-dom"

import Light from "./Light"
import Color from "./Color"

export function MeasurementsRoutes() {
  return (
    <Routes>
      <Route path="light" element={<Light/>}></Route>
      <Route path="color" element={<Color/>}></Route>
    </Routes>
  )
}