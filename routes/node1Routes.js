// routes/node1Routes.js
import express from "express";
import {
    crearNode1,
    obtenerNode1s,
    obtenerNode1,
    actualizarNode1,
    eliminarNode1
} from "../controllers/node1Controller.js";

const router = express.Router();

router.get("/", obtenerNode1s);
router.get("/:id", obtenerNode1);
router.post("/", crearNode1);
router.put("/:id", actualizarNode1);
router.delete("/:id", eliminarNode1);

export default router;
