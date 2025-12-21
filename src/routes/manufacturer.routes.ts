import { Router } from "express";
import { getManufacturers, createManufacturer, deleteManufacturer, updateManufacturer, getManufacturerById } from "../controllers/manufacturer.controller";

export const manufacturerRoutes = Router();

manufacturerRoutes.get('/', getManufacturers);

manufacturerRoutes.get('/:id', getManufacturerById);

manufacturerRoutes.post('/', createManufacturer);

manufacturerRoutes.put('/:id', updateManufacturer);

manufacturerRoutes.delete('/:id', deleteManufacturer);

export default manufacturerRoutes;