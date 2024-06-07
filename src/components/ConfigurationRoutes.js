import { Routes, Route } from "react-router-dom"

import TableDAS from "./Configuration/DAS/Table"
import DataAquisitionSystem from "./Configuration/DAS/Item"
import AddDataAquisitionSystem from './Configuration/DAS/AddPage';

import TableConfig from "./Configuration/Config/Table"
import Config from "./Configuration/Config/Item";
import AddConfig from "./Configuration/Config/AddPage";

import TableBoard from "./Configuration/Board/Table";
import Board from "./Configuration/Board/Item";

import TableMeasurementType from "./Configuration/MeasurementType/Table";
import MeasurementType from "./Configuration/MeasurementType/Item";
import AddMeasurementType from "./Configuration/MeasurementType/AddPage";

import TableSensor from "./Configuration/Sensor/Table";
import Sensor from "./Configuration/Sensor/Item";
import AddSensor from "./Configuration/Sensor/AddPage";

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

      <Route path="measurement_type" element={<TableMeasurementType/>}></Route>
      <Route path="measurement_type/:id" element={<MeasurementType/>}></Route>
      <Route path="measurement_type/create" element={<AddMeasurementType/>}></Route>

      <Route path="sensor" element={<TableSensor/>}></Route>
      <Route path="sensor/:id" element={<Sensor/>}></Route>
      <Route path="sensor/create" element={<AddSensor/>}></Route>

    </Routes>
  )
}