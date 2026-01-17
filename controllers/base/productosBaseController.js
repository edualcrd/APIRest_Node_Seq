// controllers/base/productosBaseController.js
import * as Service from "../../services/productosService.js";

export const crearProducto = async (req, res) => {
    try {
        const nuevo = await Service.crear(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear Producto", error: error.message });
    }
};

export const obtenerProductos = async (req, res) => {
    try {
        const lista = await Service.obtenerTodos();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Productos", error: error.message });
    }
};

export const obtenerProducto = async (req, res) => {
    try {
        const item = await Service.obtenerPorId(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Producto", error: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const actualizado = await Service.actualizar(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar Producto", error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const eliminado = await Service.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar Producto", error: error.message });
    }
};
