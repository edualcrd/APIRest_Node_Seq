import { Producto } from "../models/productos.js";

// CREATE
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto", error });
  }
};

// READ (todos)
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

// READ (uno)
export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
};

// UPDATE
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "No encontrado" });
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

// DELETE
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "No encontrado" });
    await producto.destroy();
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};