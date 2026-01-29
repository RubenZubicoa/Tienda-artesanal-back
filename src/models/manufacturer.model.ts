import { Filter, ObjectId } from "mongodb";
import { clientDB, database } from "../db/database";
import { Manufacturer, ManufacturerFilters, ManufacturerWithMeetingPoints } from "../types/Manufacturer";
import fs from "fs";
import { logger } from "../libs/logger";
import { getMeetingPointsByManufacturerId } from "./meetingPoint.model";
import { MeetingPoint } from "../types/MeetingPoint";

export async function getManufacturers() {
    try {
        await clientDB.connect();
        const manufacturers = await database.collection("Manufacturers").find({ isDeleted: false }).toArray();
        
        return manufacturers;
    } catch (error) {
        
        logger.error((error as Error).message, { error: (error as Error).message, stack: (error as Error).stack, timestamp: new Date().toISOString() });
        throw new Error("Error al obtener los artesanos");
    }
}

export async function getManufacturersByFilters(filters: ManufacturerFilters) {
    try {
        await clientDB.connect();
        const query: Filter<Manufacturer> = {};
        if (filters.name) {
            query.name = { $regex: filters.name, $options: 'i' };
        }
        query.isDeleted = false;
        const manufacturers = await database.collection<Manufacturer>("Manufacturers").find(query).toArray();
        
        return manufacturers;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al obtener los artesanos");
    }
}

export async function getManufacturerById(manufacturerId: string) {
    try {
        await clientDB.connect();
        const manufacturer = await database.collection<Manufacturer>("Manufacturers").findOne({ _id: new ObjectId(manufacturerId), isDeleted: false });
        
        return manufacturer;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al obtener el artesano");
    }
}

export async function getManufacturerByIdWithMeetingPoints(manufacturerId: string) {
    try {
        await clientDB.connect();
        const manufacturer = await getManufacturerById(manufacturerId);
        const meetingPoints = await getMeetingPointsByManufacturerId(manufacturerId) as MeetingPoint[];        
        return { ...manufacturer, meetingPoints } as ManufacturerWithMeetingPoints;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al obtener el artesano con los puntos de encuentro");
    }
}

export async function insertManufacturer(manufacturer: Manufacturer) {
    try {
        await clientDB.connect();
        manufacturer.createdAt = Date.now();
        manufacturer.isDeleted = false;
        const result = await database.collection("Manufacturers").insertOne(manufacturer);
        
        return result;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al crear el artesano");
    }
}

export async function updateManufacturer(manufacturerId: Manufacturer['_id'], manufacturer: Manufacturer) {
    try {
        await clientDB.connect();
        manufacturer.updatedAt = Date.now();
        const result = await database.collection("Manufacturers").updateOne({ _id: manufacturerId }, { $set: manufacturer });
        
        return result;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al actualizar el artesano");
    }
}

export async function deleteManufacturer(manufacturerId: Manufacturer['_id']) {
    try {
        await clientDB.connect();
        const result = await database.collection("Manufacturers").updateOne({ _id: manufacturerId }, { $set: { isDeleted: true } });
        
        return result;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al eliminar el artesano");
    }
}

export async function uploadManufacturerImage(manufacturerId: string, image: string) {
    try {
        await clientDB.connect();
        const result = await database.collection("Manufacturers").updateOne({ _id: new ObjectId(manufacturerId) }, { $set: { image } });
        
        return result;
    } catch (error) {
        
        console.error(error);
        throw new Error("Error al subir la imagen del artesano");
    }
}