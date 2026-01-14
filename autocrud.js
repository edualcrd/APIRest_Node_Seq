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
    const modelName = path.basename(modelFile, ".js"); // ej: productos
    const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // ej: Productos (para nombres de funciones plurales)
    
    // Calcular singular y CAPITALIZARLO para CamelCase
    const singularRaw = modelName.endsWith('s') ? modelName.slice(0, -1) : modelName; // ej: producto
    const singular = singularRaw.charAt(0).toUpperCase() + singularRaw.slice(1); // ej: Producto (para el Modelo real)

    console.log(`⚙️ Generando arquitectura para: ${modelName} (Modelo: ${singular})...`);

    // ---------------------------------------------------------
    // A. SERVICIO (CORREGIDO: Usa 'singular' para importar y usar el modelo)
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
        res.status(500).json({ mensaje: "Error al crear ${singularRaw}", error: error.message });
    }
};

export const obtener${modelClass} = async (req, res) => {
    try {
        const lista = await Service.obtenerTodos();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener ${modelName}", error: error.message });
    }
};

export const obtener${singular} = async (req, res) => {
    try {
        const item = await Service.obtenerPorId(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "${singularRaw} no encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener ${singularRaw}", error: error.message });
    }
};

export const actualizar${singular} = async (req, res) => {
    try {
        const actualizado = await Service.actualizar(req.params.id, req.body);
        if (!actualizado) return res.status(404).json({ mensaje: "${singularRaw} no encontrado" });
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar ${singularRaw}", error: error.message });
    }
};

export const eliminar${singular} = async (req, res) => {
    try {
        const eliminado = await Service.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "${singularRaw} no encontrado" });
        res.json({ mensaje: "${singularRaw} eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar ${singularRaw}", error: error.message });
    }
};
`;
    fs.writeFileSync(`${controllersBasePath}/${modelName}BaseController.js`, controllerBaseContent);

    // ---------------------------------------------------------
    // C. CONTROLADOR EXTENDIDO
    // ---------------------------------------------------------
    const controllerPath = `${controllersPath}/${modelName}Controller.js`;
    if (!fs.existsSync(controllerPath)) {
        const controllerContent = `// controllers/${modelName}Controller.js
import * as Base from "./base/${modelName}BaseController.js";

export const crear${singular} = Base.crear${singular};
export const obtener${modelClass} = Base.obtener${modelClass};
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
    obtener${modelClass},
    obtener${singular},
    actualizar${singular},
    eliminar${singular}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtener${modelClass});
router.get("/:id", obtener${singular});
router.post("/", crear${singular});
router.put("/:id", actualizar${singular});
router.delete("/:id", eliminar${singular});

export default router;
`;
    fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);
}

console.log("✅ AutoCRUD finalizado con éxito.");