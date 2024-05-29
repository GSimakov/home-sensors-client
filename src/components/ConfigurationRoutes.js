import { Routes, Route } from "react-router-dom"

import DAS from "./Configuration/DAS"

export function ConfigurationRoutes() {
  return (
    <Routes>
      <Route path="das" element={<DAS/>}></Route>
    </Routes>
  )
}