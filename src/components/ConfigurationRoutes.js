import { Routes, Route } from "react-router-dom"

import TableDAS from "./Configuration/DAS/Table"
import DataAquisitionSystem from "./Configuration/DAS/Item"
import AddDataAquisitionSystem from './Configuration/DAS/AddPage';

import TableConfig from "./Configuration/Config/Table"
import Config from "./Configuration/Config/Item";
import AddConfig from "./Configuration/Config/AddPage";

import TableBoard from "./Configuration/Board/Table";
import Board from "./Configuration/Board/Item";

export function ConfigurationRoutes() {
  return (
    <Routes>
      <Route path="das" element={<TableDAS/>}></Route>
      <Route path="das/:id" element={<DataAquisitionSystem/>}></Route>
      <Route path="das/create" element={<AddDataAquisitionSystem/>}></Route>

      <Route path="config" element={<TableConfig/>}></Route>
      <Route path="config/:id" element={<Config/>}></Route>
      <Route path="config/create" element={<AddConfig/>}></Route>

      <Route path="board" element={<TableBoard/>}></Route>
      <Route path="board/:id" element={<Board/>}></Route>

    </Routes>
  )
}