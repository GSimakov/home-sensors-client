import { Routes, Route } from "react-router-dom"

import TableDAS from "./Configuration/DAS/Table"
import DataAquisitionSystem from "./Configuration/DAS/DataAquisitionSystem"
import AddDataAquisitionSystem from './Configuration/DAS/AddPage';


export function ConfigurationRoutes() {
  return (
    <Routes>
      <Route path="das" element={<TableDAS/>}></Route>
      <Route path="das/:id" element={<DataAquisitionSystem/>}></Route>
      <Route path="das/create" element={<AddDataAquisitionSystem/>}></Route>


    </Routes>
  )
}