import * as ProductModel from '../models/product.model.js';

export async function getAll() {
  return ProductModel.findAll();
}

export async function getById(id) {
  return ProductModel.findById(id);
}

export async function create({ title, price, category, stock = 0 }) {
  return ProductModel.insert({ title, price, category, stock });
}

export async function remove(id) {
  return ProductModel.deleteById(id);
}