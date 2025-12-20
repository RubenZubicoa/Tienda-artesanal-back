import { Router } from "express";
import { getManufacturers, createManufacturer, deleteManufacturer, updateManufacturer } from "../controllers/manufacturer.controller";

export const manufacturerRoutes = Router();

manufacturerRoutes.get('/', getManufacturers);

manufacturerRoutes.post('/', createManufacturer);

manufacturerRoutes.put('/:id', updateManufacturer);

manufacturerRoutes.delete('/:id', deleteManufacturer);

export default manufacturerRoutes;