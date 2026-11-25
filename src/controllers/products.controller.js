import * as productsService from '../services/products.service.js';

function validarProducto({ title, price, category, stock }) {
  if (!title || typeof title !== 'string') return 'El campo title es obligatorio';
  if (typeof price !== 'number' || price <= 0) return 'El campo price debe ser un numero mayor a 0';
  if (!category || typeof category !== 'string') return 'El campo category es obligatorio';
  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
    return 'El campo stock debe ser un entero mayor o igual a 0';
  }
  return null;
}

export async function getProducts(req, res) {
  try {
    const { category } = req.query;
    const products = await productsService.getAll(category);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await productsService.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
}

export async function createProduct(req, res) {
  const body = req.body ?? {};
  const errorValidacion = validarProducto(body);
  if (errorValidacion) {
    return res.status(400).json({ error: errorValidacion });
  }

  try {
    const { title, price, category, stock = 0 } = body;
    const nuevo = await productsService.create({ title, price, category, stock });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

export async function updateProduct(req, res) {
  const body = req.body ?? {};
  const errorValidacion = validarProducto(body);
  if (errorValidacion) {
    return res.status(400).json({ error: errorValidacion });
  }

  try {
    const { title, price, category, stock = 0 } = body;
    const actualizado = await productsService.update(req.params.id, { title, price, category, stock });
    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const eliminado = await productsService.remove(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}