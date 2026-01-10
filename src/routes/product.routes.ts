import { Router } from "express";
import { getProducts, createProduct, deleteProduct, updateProduct, getProductsByManufacturerId, getProductById, getProductsByFilters } from "../controllers/product.controller";

export const productRoutes = Router();

productRoutes.get('/', getProducts);

productRoutes.post('/criteria', getProductsByFilters);

productRoutes.get('/:id', getProductById);

productRoutes.get('/manufacturer/:id', getProductsByManufacturerId);

productRoutes.post('/', createProduct);

productRoutes.put('/:id', updateProduct);

productRoutes.delete('/:id', deleteProduct);

export default productRoutes;