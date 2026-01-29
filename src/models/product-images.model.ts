import { clientDB, database } from "../db/database";
import { AddProductImages } from "../types/ProductImages";

export async function addProductImages(productImages: AddProductImages) {
    try {
        await clientDB.connect();
        const result = await database.collection("ProductImages").insertOne(productImages);
        
        return result;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al agregar las imágenes del producto");
    }
}