// routes/logRoutes.js
import express from "express";
import {
    crearlog,
    obtenerLog,
    obtenerlog,
    actualizarlog,
    eliminarlog
} from "../controllers/logController.js";

const router = express.Router();

router.get("/", obtenerLog);
router.get("/:id", obtenerlog);
router.post("/", crearlog);
router.put("/:id", actualizarlog);
router.delete("/:id", eliminarlog);

export default router;
