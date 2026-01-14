# Práctica: API Rest con Node.js, Sequelize y AutoCRUD

Este proyecto implementa una API RESTful con arquitectura MVC reducida generada automáticamente.

---

## 1. Cómo instalar dependencias

Para descargar e instalar todas las librerías necesarias del proyecto (Express, Sequelize, MySQL2, etc.), abre una terminal en la carpeta raíz y ejecuta:

```bash
npm install

## 2. Configuración .env

El proyecto requiere un archivo de variables de entorno para la conexión segura a la base de datos.

1.  Crea un archivo llamado `.env` en la raíz del proyecto.
2.  Define las siguientes variables dentro del archivo:

```env
DB_NAME=api_rest_db
DB_USER=root
DB_PASS=
DB_HOST=localhost
PORT=3000

---

## 3. Cómo ejecutar migraciones/seed

En este proyecto **no es necesario realizar migraciones manuales**.

* El sistema utiliza la sincronización automática de Sequelize: `sequelize.sync({ alter: true })`.
* Al iniciar el servidor, las tablas se crean o actualizan automáticamente en la base de datos según los modelos definidos en la carpeta `models/`.

---

## 4. Como lanzar el servidor

```bash
node autocrud.js


---

## 5. Cómo ejecutar el AutoCRUD

El script `autocrud.js` es el encargado de generar la arquitectura MVC (Rutas, Controladores y Servicios). Debes ejecutarlo **cada vez que añadas un nuevo modelo**.

**Comando:**
```bash
node autocrud.js

---

## 6. Ejemplos de Endpoints

A continuación se muestran los endpoints disponibles para un recurso de ejemplo (por ejemplo, `Productos`).

| Método | URL | Descripción | Ejemplo de Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/productos` | Obtener todos | N/A |
| **GET** | `/productos/:id` | Obtener uno por ID | N/A |
| **POST** | `/productos` | Crear nuevo | `{ "nombre": "PC", "precio": 500 }` |
| **PUT** | `/productos/:id` | Actualizar | `{ "precio": 450 }` |
| **DELETE**| `/productos/:id` | Eliminar | N/A |

*(Estos endpoints funcionan igual para cualquier tabla nueva, cambiando `/productos` por el nombre de tu recurso, ej: `/logs`, `/clientes`).*
