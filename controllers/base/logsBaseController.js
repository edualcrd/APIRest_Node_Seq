// controllers/base/logsBaseController.js
import * as Service from "../../services/logsService.js";

export const crearLog = async (req, res) => {
    try {
        const nuevo = await Service.crear(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear Log", error: error.message });
    }
};

export const obtenerLogs = async (req, res) => {
    try {
        const lista = await Service.obtenerTodos();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Logs", error: error.message });
    }
};

export const obtenerLog = async (req, res) => {
    try {
        const item = await Service.obtenerPorId(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "Log no encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener Log", error: error.message });
    }
};

export const actualizarLog = async (req, res) => {
    try {
        const actualizado = await Service.actualizar(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ mensaje: "Log no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar Log", error: error.message });
    }
};

export const eliminarLog = async (req, res) => {
    try {
        const eliminado = await Service.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "Log no encontrado" });
        res.json({ mensaje: "Log eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar Log", error: error.message });
    }
};
