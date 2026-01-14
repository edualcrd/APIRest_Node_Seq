import express from "express";
import productoRoutes from "./routes/productosRoutes.js";
import { sequelize } from "./config/db.js";
import logRoutes from "./routes/logsRoutes.js";

const app = express();
app.use(express.json());

// Rutas
app.use("/productos", productoRoutes);
app.use("/logs", logRoutes);

// Sincronizar base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas.");
  } catch (error) {
    console.error("Error al sincronizar las tablas:", error);
  }
})();

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));