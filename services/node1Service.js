// services/node1Service.js
import { Node1 } from "../models/node1.js";

export const crear = async (datos) => {
    return await Node1.create(datos);
};

export const obtenerTodos = async () => {
    return await Node1.findAll();
};

export const obtenerPorId = async (id) => {
    return await Node1.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await Node1.findByPk(id);
    if (!item) return null;
    return await item.update(datos);
};

export const eliminar = async (id) => {
    const item = await Node1.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
