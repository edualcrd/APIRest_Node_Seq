// services/logsService.js
import { Log } from "../models/logs.js";

export const crear = async (datos) => {
    return await Log.create(datos);
};

export const obtenerTodos = async () => {
    return await Log.findAll();
};

export const obtenerPorId = async (id) => {
    return await Log.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await Log.findByPk(id);
    if (!item) return null;
    return await item.update(datos);
};

export const eliminar = async (id) => {
    const item = await Log.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
