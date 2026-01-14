// controllers/logController.js
import * as Base from "./base/logBaseController.js";

// Si necesitas sobrescribir un método, defínelo aquí.
// Ejemplo:
// export const obtenerLog = async (req, res) => {
//     console.log('Lógica personalizada antes de llamar al base');
//     await Base.obtenerLog(req, res);
// };

// Exportar por defecto los métodos del base
export const crearlog = Base.crearlog;
export const obtenerLog = Base.obtenerLog;
export const obtenerlog = Base.obtenerlog;
export const actualizarlog = Base.actualizarlog;
export const eliminarlog = Base.eliminarlog;
