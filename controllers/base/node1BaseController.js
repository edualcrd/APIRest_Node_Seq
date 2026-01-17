// controllers/base/node1BaseController.js
import * as Service from "../../services/node1Service.js";

export const crearNode1 = async (req, res) => {
    try {
        const nuevo = await Service.crear(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear Node1", error: error.message });
    }
};

export const obtenerNode1s = async (req, res) => {
    try {
        const lista = await Service.obtenerTodos();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Node1s", error: error.message });
    }
};

export const obtenerNode1 = async (req, res) => {
    try {
        const item = await Service.obtenerPorId(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "Node1 no encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Node1", error: error.message });
    }
};

export const actualizarNode1 = async (req, res) => {
    try {
        const actualizado = await Service.actualizar(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ mensaje: "Node1 no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar Node1", error: error.message });
    }
};

export const eliminarNode1 = async (req, res) => {
    try {
        const eliminado = await Service.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "Node1 no encontrado" });
        res.json({ mensaje: "Node1 eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar Node1", error: error.message });
    }
};
