import { Routes, Route } from "react-router-dom"

import TableDAS from "./Configuration/DAS/Table"
import DataAquisitionSystem from "./Configuration/DAS/DataAquisitionSystem"

export function ConfigurationRoutes() {
  return (
    <Routes>
      <Route path="das" element={<TableDAS/>}></Route>
      <Route path="das/:id" element={<DataAquisitionSystem/>}></Route>

    </Routes>
  )
}