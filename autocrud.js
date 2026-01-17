import fs from "fs";
import path from "path";

// 1. Definición de carpetas
const modelsPath = "./models";
const servicesPath = "./services";
const controllersBasePath = "./controllers/base";
const controllersPath = "./controllers";
const routesPath = "./routes";

// Crear directorios si no existen
[servicesPath, controllersBasePath, controllersPath, routesPath].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 2. Leer modelos
const models = fs.readdirSync(modelsPath)
    .filter(f => f.endsWith(".js") && f !== "init-models.js");

console.log(`🔎 Modelos encontrados: ${models.join(", ")}`);

for (const modelFile of models) {
    const modelName = path.basename(modelFile, ".js"); // ej: productos, node1
    
    // LÓGICA DE PLURAL/SINGULAR MEJORADA
    let singularRaw = modelName;
    let pluralRaw = modelName;

    if (modelName.endsWith('s')) {
        // Si termina en 's' (ej: productos)
        singularRaw = modelName.slice(0, -1); // producto
        pluralRaw = modelName; // productos
    } else {
        // Si NO termina en 's' (ej: node1, log) -> Forzamos plural con 's'
        singularRaw = modelName; // node1
        pluralRaw = modelName + 's'; // node1s (para evitar duplicados)
    }

    // Capitalizar
    const singular = singularRaw.charAt(0).toUpperCase() + singularRaw.slice(1); // Node1
    const plural = pluralRaw.charAt(0).toUpperCase() + pluralRaw.slice(1); // Node1s

    console.log(`⚙️ Generando arquitectura para: ${modelName} (Lista: ${plural} | Detalle: ${singular})...`);

    // ---------------------------------------------------------
    // A. SERVICIO
    // ---------------------------------------------------------
    const serviceContent = `// services/${modelName}Service.js
import { ${singular} } from "../models/${modelName}.js";

export const crear = async (datos) => {
    return await ${singular}.create(datos);
};

export const obtenerTodos = async () => {
    return await ${singular}.findAll();
};

export const obtenerPorId = async (id) => {
    return await ${singular}.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await ${singular}.findByPk(id);
    if (!item) return null;
    return await item.update(datos);
};

export const eliminar = async (id) => {
    const item = await ${singular}.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
`;
    fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);

    // ---------------------------------------------------------
    // B. CONTROLADOR BASE
    // ---------------------------------------------------------
    const controllerBaseContent = `// controllers/base/${modelName}BaseController.js
import * as Service from "../../services/${modelName}Service.js";

export const crear${singular} = async (req, res) => {
    try {
        const nuevo = await Service.crear(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear ${singular}", error: error.message });
    }
};

export const obtener${plural} = async (req, res) => {
    try {
        const lista = await Service.obtenerTodos();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener ${plural}", error: error.message });
    }
};

export const obtener${singular} = async (req, res) => {
    try {
        const item = await Service.obtenerPorId(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "${singular} no encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener ${singular}", error: error.message });
    }
};

export const actualizar${singular} = async (req, res) => {
    try {
        const actualizado = await Service.actualizar(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ mensaje: "${singular} no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar ${singular}", error: error.message });
    }
};

export const eliminar${singular} = async (req, res) => {
    try {
        const eliminado = await Service.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "${singular} no encontrado" });
        res.json({ mensaje: "${singular} eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar ${singular}", error: error.message });
    }
};
`;
    fs.writeFileSync(`${controllersBasePath}/${modelName}BaseController.js`, controllerBaseContent);

    // ---------------------------------------------------------
    // C. CONTROLADOR EXTENDIDO
    // ---------------------------------------------------------
    const controllerPath = `${controllersPath}/${modelName}Controller.js`;
    // SIEMPRE REGENERARLO SI ES NODE1 (por si acaso quedó mal), 
    // pero respetando la lógica original de no sobrescribir para otros.
    // Para simplificarte el examen: borra el archivo node1Controller.js manualmente antes de ejecutar si tienes dudas.
    if (!fs.existsSync(controllerPath)) {
        const controllerContent = `// controllers/${modelName}Controller.js
import * as Base from "./base/${modelName}BaseController.js";

export const crear${singular} = Base.crear${singular};
export const obtener${plural} = Base.obtener${plural};
export const obtener${singular} = Base.obtener${singular};
export const actualizar${singular} = Base.actualizar${singular};
export const eliminar${singular} = Base.eliminar${singular};
`;
        fs.writeFileSync(controllerPath, controllerContent);
    } else {
        console.log(`   ⚠️ Controlador existente preservado: ${modelName}Controller.js`);
    }

    // ---------------------------------------------------------
    // D. RUTA
    // ---------------------------------------------------------
    const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
    crear${singular},
    obtener${plural},
    obtener${singular},
    actualizar${singular},
    eliminar${singular}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtener${plural});
router.get("/:id", obtener${singular});
router.post("/", crear${singular});
router.put("/:id", actualizar${singular});
router.delete("/:id", eliminar${singular});

export default router;
`;
    fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);
}

console.log("✅ AutoCRUD finalizado con éxito.");