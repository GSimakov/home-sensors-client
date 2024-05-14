import { Routes, Route } from "react-router-dom"

import Light from "./Light"

export function MeasurementsRoutes() {
  return (
    <Routes>
      <Route path="light" element={<Light/>}>
      </Route>
    </Routes>
  )
}