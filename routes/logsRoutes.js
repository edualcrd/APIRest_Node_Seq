// routes/logsRoutes.js
import express from "express";
import {
    crearLog,
    obtenerLogs,
    obtenerLog,
    actualizarLog,
    eliminarLog
} from "../controllers/logsController.js";

const router = express.Router();

router.get("/", obtenerLogs);
router.get("/:id", obtenerLog);
router.post("/", crearLog);
router.put("/:id", actualizarLog);
router.delete("/:id", eliminarLog);

export default router;
