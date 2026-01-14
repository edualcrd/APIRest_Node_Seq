// services/productosService.js
import { Producto } from "../models/productos.js";

export const crear = async (datos) => {
    return await Producto.create(datos);
};

export const obtenerTodos = async () => {
    return await Producto.findAll();
};

export const obtenerPorId = async (id) => {
    return await Producto.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await Producto.findByPk(id);
    if (!item) return null;
    return await item.update(datos);
};

export const eliminar = async (id) => {
    const item = await Producto.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
